// components/ProfileCard.tsx
import { FC } from "react";
import { Mail, Phone, Globe, MapPin, CheckCircle, Star } from "lucide-react";
import EditIcon from "./icons/edit-icon";
import ContactIcon from "./icons/contact-icon";

interface ProfileCardProps {
  name: string;
  title: string;
  rating: number;
  reviews: number;
  projects: number;
  rate: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  memberSince: string;
  availability: string;
  totalEarned: string;
  responseRate: string;
  responseTime: string;
}

const ProfileCard: FC<ProfileCardProps> = ({
  name,
  title,
  rating,
  reviews,
  projects,
  rate,
  description,
  email,
  phone,
  website,
  location,
  memberSince,
  totalEarned,
  responseRate,
  responseTime,
}) => {
  return (
    <div className=" relative bg-white rounded-2xl shadow-lg border border-[#E5E7EB80] p-6">
      {/* Header */}
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
        {/* Avatar */}
        <div>
            <div className="flex-shrink-0 w-25 h-25 rounded-full bg-[#006633] flex items-center justify-center text-white text-2xl font-bold">
            {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
               {/* Meta */}
            <div className="flex flex-col gap-1 mt-4 text-sm text-[#4A5565]">
                <div className="flex items-center gap-1">
                <MapPin className="w-[14px] h-[14px]" /> {location}
                </div>
                <div className="text-sm text-[#4A5565]">Member since {memberSince}</div>
            </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <h2 className="text-2xl font-[700] text-center md:text-left">{name}</h2>
          </div>
          <p className="text-[#4A5565] text-lg text-center md:text-left">{title}</p>

          {/* Rating + Projects + Rate */}
          <div className="flex items-center justify-center md:justify-start gap-4 text-sm mt-2 text-gray-600">
            <span className="flex gap-2 items-center"> <Star fill="#FCC800" color="#FCC800" className="w-[14px] h-[14px]" /> {rating} ({reviews} reviews)</span>
            <span className="flex gap-2 items-center"> <CheckCircle className="w-[14px] h-[14px]" /> {projects} projects completed</span>
            <span className="flex gap-2 items-center">{rate}</span>
          </div>

          {/* Description */}
          <p className="mt-3 text-[#364153] text-sm text-center md:text-left">{description}</p>

          {/* Contact */}
          <div className="flex justify-center md:justify-start gap-3 mt-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Mail className="w-[14px] h-[14px]" /> {email}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-[14px] h-[14px]" /> {phone}
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-[14px] h-[14px]" /> {website}
            </div>
          </div>
          
      {/* Stats */}
      <div className="flex gap-4 mt-6 text-center">
        <div className="w-[200px] p-4 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
          <p className="text-xl font-[700] text-[#00A63E]">{totalEarned}</p>
          <p className="text-xs text-[#4A5565]">Total Earned</p>
        </div>
        <div className="w-[200px] p-4 rounded-xl bg-[#FFF7ED] border border-[#FFEDD4]">
          <p className="text-xl font-[700] text-[#F54900]">{responseRate}</p>
          <p className="text-xs text-[#4A5565]">Response Rate</p>
        </div>
        <div className="w-[200px] p-4 rounded-xl bg-[#FAF5FF] border border-[#F3E8FF]">
          <p className="text-xl font-[700] text-[#9810FA]">{responseTime}</p>
          <p className="text-xs text-[#4A5565]">Response Time</p>
        </div>
      </div>
        </div>

        {/* Actions */}
        <div className="absolute top-[28px] right-[28px] flex gap-2">
          <button className="flex gap-2 items-center px-3 py-2 text-sm border rounded-lg border-[#E5E7EB] hover:bg-gray-50">
            <EditIcon />
            <span className="text-sm text-[#1A1A1A]">Edit Profile</span>
          </button>
          <button className="flex gap-2 items-center px-3 py-2 text-sm bg-[#006633] text-white rounded-lg hover:bg-green-700">
            <ContactIcon />
            <span className="text-sm text-white">Contact</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
