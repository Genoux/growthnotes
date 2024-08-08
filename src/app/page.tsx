// TODO: useQuery once for all posts and reuse the data

import PostList from '@/app/components/PostList'
import SubscriptionForm from '@/app/components/SubscriptionForm'
import SubscriptionBanner from '@/app/components/SubscriptionBanner'
import Image from 'next/image'
import BrandScroll from '@/app/components/BrandScroll';
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='mx-auto w-full'>
      <section className='py-20 border-b'>
        <div className='flex flex-col gap-24 container'>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col w-full gap-6'>
              <h1 className='text-7xl font-bold-condensed -tracking-[0.275rem] w-full'>INSIGHTS FOR THE MODERN MARKETER</h1>
              <p className='text-xl leading-snug'>We deliver monthly, data-driven analysis and practical strategies to over 30,000 e-commerce experts. </p>
              <SubscriptionForm />
            </div>
            <Image src="/grid-blob.svg" alt="GN Blob" width={400} height={420} className='ml-auto w-3/4 h-auto flex object-contain' />
          </div>
          <BrandScroll />
        </div>
      </section>
      <section className='container flex flex-col gap-8 pt-24 pb-32'>
        <div className='w-full flex items-center justify-between'>
          <h2 className='text-5xl font-bold-condensed uppercase'>Past Issues</h2>
          <Link href='/posts/'>
            <Button className='bg-lighter-green text-primary border border-primary rounded-full hover:bg-lighter-green/70'>View All</Button>
          </Link>
        </div>
        <PostList limit={3} className="grid-cols-3" />
      </section>
      <section className='border-y'>
        <div className=' container flex items-center h-full border-r'>
          <div className='border-x py-20 h-full w-full'>
            <Image src="/geo-blod.svg" alt="GN Blob" width={500} height={600} className='mx-auto w-48 h-full object-contain' />
          </div>
          <div className='flex flex-col justify-center h-full'>
            <div className='flex flex-col gap-6 items-center px-16'>
              <h2 className='text-6xl font-bold-condensed uppercase'>{"We're your monthly dose of business insights, curated for the modern marketer."}</h2>
              <p>
                {"With over 70,000 industry experts trusting our content, we bring you the latest trends, data-driven strategies, and practical advice that actually move the needle. we're here to keep you ahead of the curve in the ever-evolving world of digital commerce."}
              </p>
            </div>
          </div>
        </div>
      </section>
      <SubscriptionBanner className='container my-20' />
    </main>
  );
}