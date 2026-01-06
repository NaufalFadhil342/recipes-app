import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Edit from "../../UI/edit";
import { Outlet } from "react-router";

const UserProfile = () => {
  const { user } = useAuth();
  const email = user?.email.split("@")[0];
  const [imageError, setImageError] = useState(false);

  const username = user?.user_metadata?.display_name;
  const profession = user?.user_metadata?.profession || "-";
  const firstname = user?.user_metadata?.first_name || "-";
  const lastname = user?.user_metadata?.last_name || "-";
  const phone = user?.user_metadata?.phone || "-";
  const avatar = user?.user_metadata?.avatar_url;

  const DefaultAvatar = () => (
    <div className="w-full h-full bg-linear-to-br from-primary to-yellow-400 flex items-center justify-center" />
  );

  const avatarElement =
    avatar && !imageError ? (
      <img
        className="w-full h-full object-cover object-center"
        width={768}
        height={768}
        src={avatar}
        alt={username || email}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    ) : (
      <DefaultAvatar />
    );

  return (
    <section className="w-full h-auto my-28 px-12 md:px-20 flex flex-col gap-10">
      <h1 className="text-4xl uppercase font-bold">User Profile</h1>
      <div className="w-full h-auto p-6 rounded-3xl bg-white shadow-[0_3px_6px_rgba(41,37,36,0.1)] flex justify-between">
        <div className="w-auto h-auto flex items-center gap-4">
          <div className="size-20 rounded-full overflow-hidden">
            {avatarElement}
          </div>
          <div className="w-auto h-auto">
            <h3 className="text-xl font-semibold">{username || email}</h3>
            <p className="text-stone-600">{profession}</p>
          </div>
        </div>
        <div className="w-auto h-auto">
          <Edit editPath="edit/userDisplay" />
        </div>
      </div>
      <div className="w-full h-auto bg-white rounded-3xl shadow-[0_3px_6px_rgba(41,37,36,0.1)] p-6 gap-10 relative">
        <div className="w-full h-auto flex items-start justify-between">
          <h2 className="text-3xl font-semibold">Personal Information</h2>
          <Edit editPath="edit/personal" />
        </div>
        <div className="w-full h-auto mt-10">
          <div className="w-full h-auto flex gap-6">
            <div className="w-full h-auto">
              <label className="text-stone-600 text-sm">First Name</label>
              <p className="text-inherit font-medium">{firstname}</p>
            </div>
            <div className="w-full h-auto">
              <label className="text-stone-600 text-sm">Last Name</label>
              <p className="text-inherit font-medium">{lastname}</p>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col sm:flex-row gap-6 my-6">
            <div className="w-full h-auto">
              <label className="text-stone-600 text-sm">Email</label>
              <p className="text-inherit font-medium">{user?.email}</p>
            </div>
            <div className="w-full h-auto">
              <label className="text-stone-600 text-sm">Phone</label>
              <p className="text-inherit font-medium">{phone}</p>
            </div>
          </div>
          <div className="w-full h-auto">
            <label className="text-stone-600 font-sm">Profession</label>
            <p className="text-inherit font-medium">{profession}</p>
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default UserProfile;
