/* eslint-disable camelcase */
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createUser } from '@/lib/actions/user.action';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint

  // TODO: Add the webhook sectret to the .env file

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  const eventType = evt.type;

  // Need to check the eventType to see what to do with the payload
  if (eventType === 'user.created') {
    // Get the data from the payload in order to assign it to a new user when created.
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    // Create new user and connect loose ends from Clerk and MongoDB
    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name} ${last_name ? `${last_name}` : ''}`,
      username: username!, // I know the username is not going to be undefined; using the '!' will signifies this.
      email: email_addresses[0].email_address,
      picture: image_url,
    });
    return NextResponse.json({ message: 'Success', user: mongoUser });
  } else if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    // Update the user  TODO: create a new server action to update the user...
    const mongoUser = await updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name} ${last_name ? `${last_name}` : ''}`,
        username: username!, // I know the username is not going to be undefined; using the '!' will signifies this.
        email: email_addresses[0].email_address,
        picture: image_url,
      },
      // Will need to revalidate with the updated info
      path: `/profile/${id}`,
    });
    return NextResponse.json({ message: 'Success', user: mongoUser });
  }

  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log('Webhook body:', body);

  return new Response('', { status: 200 });
}
