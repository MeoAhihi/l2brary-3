import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import { PhoneCall, Mail, Users, VenusAndMars, Cake } from "lucide-react";

type ProfileCardContentProps = {
    id: string,
    avatarUrl: string;
    name: string;
    phone: string;
    email: string;
    className: string;
    gender: string;
    birthday: string;
};

export default function ProfileCardContent({
    id,
    avatarUrl,
    name,
    phone,
    email,
    className,
    gender,
    birthday,
}: ProfileCardContentProps) {
    return (
        <CardContent>
            <Image
                src={avatarUrl}
                alt="avatar"
                className="rounded-full mx-auto"
                width={200}
                height={200}
            />
            <h3 className="text-lg font-semibold text-center mt-4">
                {name}
            </h3>
            <div className="text-center text-xs text-muted-foreground mt-1">
                ID: {id}
            </div>
            <div className="flex flex-col gap-y-4 mt-2">
                <div className="flex flex-row gap-3 items-center">
                    <PhoneCall opacity={0.3} size={18} />
                    {phone}
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <Mail opacity={0.3} size={18} />
                    {email}
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <Users opacity={0.3} size={18} />
                    {className}
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <VenusAndMars opacity={0.3} size={18} />
                    {gender}
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <Cake opacity={0.3} size={18} />
                    {birthday}
                </div>
            </div>
        </CardContent>
    );
}