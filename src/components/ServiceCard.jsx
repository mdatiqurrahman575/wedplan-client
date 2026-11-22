'use client';

import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { MapPin, Tag, Store, ArrowRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleViewDetails = () => {
    if (!session?.user) {
      router.push(`/sign-in?callbackUrl=/services/${service._id}`);
    } else {
      router.push(`/services/${service._id}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-rose-50">
        <img
          src={service.images?.at(0) || 'https://unsplash.com'}
          alt={service.serviceName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-rose-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
          <Tag className="w-3 h-3" /> {service.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">{service.serviceName}</h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
            <Store className="w-3.5 h-3.5 text-rose-500" /> {service.vendorName || 'Verified Vendor'}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1 mb-4">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" /> <span className="truncate">{service.location}</span>
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block">Starting at</span>
            <span className="text-xl font-bold text-rose-600">${service.price}</span>
          </div>
          <button
            onClick={handleViewDetails}
            className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition cursor-pointer"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
