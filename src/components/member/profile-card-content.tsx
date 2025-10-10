import { Cake, Mail, PhoneCall, Users, VenusAndMars } from "lucide-react";
import Image from "next/image";

import { CardContent } from "@/components/ui/card";

type ProfileCardContentProps = {
  id: string;
  avatarUrl: string;
  name: string;
  phone: string;
  email: string;
  // className: string;
  gender: string;
  birthday: string;
};

export default function ProfileCardContent({
  id,
  avatarUrl,
  name,
  phone,
  email,
  // className,
  gender,
  birthday,
}: ProfileCardContentProps) {
  return (
    <CardContent>
      <Image
        src={avatarUrl}
        alt="avatar"
        className="mx-auto rounded-full"
        width={200}
        height={200}
      />
      <h3 className="mt-4 text-center text-lg font-semibold">{name}</h3>
      <div className="text-muted-foreground mt-1 text-center text-xs">
        ID: {id}
      </div>
      <div className="mt-2 flex flex-col gap-y-4">
        <div className="flex flex-row items-center gap-3">
          <PhoneCall opacity={0.3} size={18} />
          {phone}
        </div>
        <div className="flex flex-row items-center gap-3">
          <Mail opacity={0.3} size={18} />
          {email}
        </div>
        {/* <div className="flex flex-row items-center gap-3">
          <Users opacity={0.3} size={18} />
          {className}
        </div> */}
        <div className="flex flex-row items-center gap-3">
          <VenusAndMars opacity={0.3} size={18} />
          {gender}
        </div>
        <div className="flex flex-row items-center gap-3">
          <Cake opacity={0.3} size={18} />
          {birthday}
        </div>
      </div>
    </CardContent>
  );
}
