import React from 'react';
import Link from 'next/link';
import BrandScroll from '@/app/components/BrandScroll';
import SubscriptionForm from '../components/SubscriptionForm';

export default function Subscribed() {
  return (
    <div className='container flex flex-col gap-12 py-32'>
      <div className='flex flex-col items-center gap-6'>
        <h1 className="max-w-screen-lg text-7xl font-bold-condensed text-center -tracking-[0.175rem]">Join top marketers for insights that truly move the needle.</h1>
        <p className="text-2xl text-orange">Data-driven strategies trusted by industry leaders.</p>
      </div>
      <SubscriptionForm className='w-1/2 mx-auto' />
      <BrandScroll slidesPerView={8} className='w-full mt-24' />
    </div>
  );
}