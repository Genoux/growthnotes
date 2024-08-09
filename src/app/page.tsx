// TODO: useQuery once for all posts and reuse the data

import PostList from '@/app/components/PostList'
import SubscriptionForm from '@/app/components/SubscriptionForm'
import SubscriptionBanner from '@/app/components/SubscriptionBanner'
import Image from 'next/image'
import BrandScroll from '@/app/components/BrandScroll'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="mx-auto w-full">
      <section className="py-20 border-b">
        <div className="flex flex-col gap-24 container">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="flex flex-col w-full gap-6 px-6 md:px-0">
              <h1 className="text-6xl lg:text-7xl text-center md:text-left font-bold-condensed -tracking-[0.275rem] w-full">
                INSIGHTS FOR THE MODERN MARKETER
              </h1>
              <p className="text-md lg:text-xl leading-snug text-center md:text-left sm:w-3/4 md:w-full mx-auto">
                We deliver monthly, data-driven analysis and practical
                strategies to over 30,000 e-commerce experts.{' '}
              </p>
              <SubscriptionForm className="w-full sm:w-4/5 md:w-full mx-auto" />
            </div>
            <Image
              src="/grid-blob.svg"
              alt="GN Blob"
              width={400}
              height={420}
              className="hidden md:flex ml-auto w-3/4 h-auto object-contain"
            />
          </div>
          <BrandScroll />
        </div>
      </section>
      <section className="container flex flex-col gap-8 pt-24 pb-32">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-3xl md:text-5xl font-bold-condensed uppercase">
            Past Issues
          </h2>
          <Link href="/posts/">
            <Button className="bg-lighter-green text-primary border border-primary rounded-full hover:bg-lighter-green/70">
              View All
            </Button>
          </Link>
        </div>
        <PostList
          limit={3}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        />
      </section>
      <section className="border-y">
        <div className=" container flex items-center h-full border-x md:border-l-0 py-20 md:py-0">
          <div className="border-x md:px-12 lg:px-0 py-20 h-full w-full hidden md:block">
            <Image
              src="/geo-blod.svg"
              alt="GN Blob"
              width={500}
              height={600}
              className="mx-auto w-full lg:w-48 h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center h-full">
            <div className="flex flex-col gap-6 items-center px-6 md:px-16">
              <h2 className="text-4xl lg:text-6xl font-bold-condensed uppercase">
                {
                  "We're your monthly dose of business insights, curated for the modern marketer."
                }
              </h2>
              <p className="text-sm lg:text-md">
                {
                  "With over 70,000 industry experts trusting our content, we bring you the latest trends, data-driven strategies, and practical advice that actually move the needle. we're here to keep you ahead of the curve in the ever-evolving world of digital commerce."
                }
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container my-20">
        <SubscriptionBanner />
      </section>
    </main>
  )
}
