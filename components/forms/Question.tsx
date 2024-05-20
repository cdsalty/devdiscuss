'use client';

import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { QuestionsSchema } from '@/lib/validations';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { createQuestion } from '@/lib/actions/question.action';

const type: any = 'create';

interface MongoUserProps {
  mongoUserId: string;
}

const Question = ({ mongoUserId }: MongoUserProps) => {
  const router = useRouter();

  // eslint-disable-next-line no-unused-vars
  const pathname = usePathname();
  // Establish a reference to the editor.
  const editorRef = useRef(null); // to prevent having to manually track every keystroke.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define the form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: '',
      explanation: '',
      tags: [],
    },
  });

  // 2. Define a submit handler. -> will use state for isSubmitting
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmitting(true); // always a good measure to have to prevent multiple submissions
    // Do something with the form values.
    try {
      // ready for server actions!
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });
      // Navigate to homepage after submitting the question.
      router.push('/');
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement; // This is necessary because the target of the event is of type EventTarget, which doesn't have a value property. By casting it to an HTMLInputElement, we can access the value property.
      const tagValue = tagInput.value.trim();

      if (tagValue !== '') {
        if (tagValue.length > 10) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag should be less than 10 characters',
          });
        }
        // Check if the tag already exists in the tags array.
        if (!field.value.includes(tagValue as never)) {
          // Set the tag values by spreading out the actual values and then passing the new tagValue.
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = ''; // Clear the input field after adding the tag.
          form.clearErrors('tags'); // Clear the error message if there was any.
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    // only remove the tag that is clicked on...
    // create a new instance that is set to all the tags except the one that was clicked on.
    const newTags = field.value.filter((t: string) => t !== tag);
    // update the tags field with the newTags. To do this, use the setValue method from the form object.
    form.setValue('tags', newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10 pt-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be Specific with your question(s). It is important to always ask
                a question that is clear and concise.
              </FormDescription>
              {/* FormMessage is used to show any error messages */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Write a detailed explanation of the problem{' '}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  // @ts-ignore
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'codesample',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                      'code',
                    ],
                    toolbar:
                      'undo redo | ' +
                      'codesample | bold italic forecolor | alignleft aligncenter |' +
                      'alignright alignjustify | bullist numlist',
                    // content_style: 'body { font-family:Inter; font-size:16px }',
                    // skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                    // content_css: mode === 'dark' ? 'dark' : 'light',
                    // content_style:'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on the title. Minimum of 20
                characters.
              </FormDescription>
              {/* FormMessage is for showing the error */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* TAGS */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                {/* FormControl can only take one things we have to use react fragments here: */}
                <>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                          onClick={() => handleTagRemove(tag, field)}
                        >
                          {tag}
                          <Image
                            src="/assets/icons/close.svg"
                            alt="close icon"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to three tags most aligned to your question. Press enter
                to add a tag.
              </FormDescription>
              {/* FormMessage is for showing the error */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
        >
          {isSubmitting ? (
            <>{type === 'edit' ? 'Editing...' : 'Posting...'}</>
          ) : (
            <>{type === 'edit' ? 'Edit Question' : 'Ask a Question'}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
