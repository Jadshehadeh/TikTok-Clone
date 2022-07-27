import sanityClient from '@sanity/client';
import { NEXT_PUBLIC_SANITY_TOKEN } from '../config';

export const client = sanityClient({
  projectId: 'losjywfq',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});
