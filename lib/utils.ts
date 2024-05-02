import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// For Timestamps to show how long ago something was posted; pass in a date and return a string
export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const elapsed = now.getTime() - createdAt.getTime(); // difference in milliseconds

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
};

// Function to render large numbers in the millions and thousands format
export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1_000_000) {
    const dividedNumber = num / 1_000_000;
    // Check if the decimal part is zero and format accordingly
    return dividedNumber % 1 === 0
      ? `${dividedNumber.toFixed(0)}M`
      : `${dividedNumber.toFixed(1)}M`;
  } else if (num >= 1_000) {
    const dividedNumber = num / 1_000;
    // For thousands, remove the decimal part if it's zero
    return dividedNumber % 1 === 0
      ? `${dividedNumber.toFixed(0)}K`
      : `${dividedNumber.toFixed(0)}K`;
  } else {
    return num.toString();
  }
};
