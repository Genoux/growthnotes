import SubscriptionForm from '@/app/components/SubscriptionForm'

type SubscriptionBannerProps = {
  className?: string
}

const SubscriptionBanner = ({ className = '' }: SubscriptionBannerProps) => {
  return (
    <div className={className}>
      <div className="bg-yellow py-36 shadow-hard outline outline-4 outline-primary rounded-sm">
      <div className="max-w-3xl mx-auto text-center flex flex-col gap-12">
        <h2 className="text-4xl font-medium">
          Join 70,000+ e-commerce experts that get deep marketing insights every week.
        </h2>
          <div className='flex flex-col gap-6 items-center justify-center'>
          <SubscriptionForm className='w-5/6' />
          <p className="text-2xl font-normal tracking-tight">Join us, and turn insight into impact.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SubscriptionBanner;