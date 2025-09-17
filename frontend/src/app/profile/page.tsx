import ProfileCard from "@/components/profile-card";
import { auth } from "../../../auth";
import type { Session } from "next-auth";
import { AllSection2 } from "@/components/FreelancerProfile/Section2/AllSection2";

type SessionWithToken = Session & { accessToken?: string };

interface FreelancerProfile {
    user?: { id?: number; name?: string; email?: string; created_at?: string };
    title?: string;
    bio?: string;
    hourly_rate?: number;
    phone_number?: string;
    website?: string;
    location?: string;
    available?: boolean;
    is_complete?: boolean;
    total_earnings?: number;
    completed_projects_count?: number;
    reviews_count?: number;
    average_rating?: number;
}

const ProfilePage = async () => { 
    const session = await auth();

    const accessToken = (session as SessionWithToken | null)?.accessToken;

    let profile: FreelancerProfile | null = null;
    try {
        const res = await fetch("http://127.0.0.1:6565/api/v1/freelancer/profile", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
            },
            cache: "no-store",
        });
        if (res.ok) {
            const json = await res.json();
            profile = json?.data ?? null;
        }
    } catch {
    }

    const name = profile?.user?.name ?? "";
    const title = profile?.title ?? "";
    const rating = Number(profile?.average_rating ?? 0);
    const reviews = Number(profile?.reviews_count ?? 0);
    const projects = Number(profile?.completed_projects_count ?? 0);
    const rate = profile?.hourly_rate != null ? `$${profile.hourly_rate}/hour` : "";
    const description = profile?.bio ?? "";
    const email = profile?.user?.email ?? "";
    const phone = profile?.phone_number ?? "";
    const website = profile?.website ?? "";
    const location = profile?.location ?? "";
    const memberSinceRaw = profile?.user?.created_at ?? ""; // e.g., "Member since 2025"
    const memberSince = typeof memberSinceRaw === "string" ? memberSinceRaw.replace(/^Member since\s*/i, "") : "";
    const totalEarned = profile?.total_earnings != null ? `$${profile.total_earnings}` : "";
    const responseRate = "-"; // not provided by API
    const responseTime = "-"; // not provided by API

    return (
        <div className=" lg:px-[228px] md:px-[62px] px-4">
            <ProfileCard
                name={name}
                title={title}
                rating={rating}
                reviews={reviews}
                projects={projects}
                rate={rate}
                description={description}
                email={email}
                phone={phone}
                website={website}
                location={location}
                memberSince={memberSince}
                availability={profile?.available ? "Available" : "Unavailable"}
                totalEarned={totalEarned}
                responseRate={responseRate}
                responseTime={responseTime}
            />
            <AllSection2 />
        </div>
    )
}
export default ProfilePage;