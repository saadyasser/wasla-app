import ProfileCard from "@/components/profile-card";

const ProfilePage = () => { 
    return (
        <div className="flex lg:px-[128px] md:px-[62px] px-4">
        <ProfileCard
            name="Ahmad Mohammad Al-Saadi"
            title="Full-Stack Developer & Mobile App Developer"
            rating={4.9}
            reviews={47}
            projects={23}
            rate="$25-35/hour"
            description="Passionate full-stack developer specializing in React and Node.js with 5+ years of experience building web applications and mobile solutions. Committed to delivering innovative technical solutions that serve the Palestinian and Arab community."
            email="ahmad.alsaadi@email.com"
            phone="+970 59 123 4567"
            website="www.ahmaddev.ps"
            location="Gaza, Palestine"
            memberSince="2022"
            availability="Available"
            totalEarned="$15,230"
            responseRate="95%"
            responseTime="2 hours"
            />
        </div>
    )
}
export default ProfilePage;