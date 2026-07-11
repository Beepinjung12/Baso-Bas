"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  User,
  Phone,
  MapPin,
  FileText,
  ArrowLeft,
  Save,
  Mail,
} from "lucide-react";

import {
  getUserProfile,
  updateUserProfile,
} from "@/app/api/auth";


export default function EditProfilePage() {

  const router = useRouter();


  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");



  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    bio: "",
  });



  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await getUserProfile();

        const user = res.data?.data;


        setProfile(user);


        setFormData({

          name: user?.name || "",

          phone: user?.phone || "",

          address: user?.address || "",

          bio: user?.bio || "",

        });


      } catch (err) {

        setError(
          "Failed to load profile. Please login again."
        );


        setTimeout(() => {

          router.push("/auth/login");

        },2000);


      } finally {

        setLoading(false);

      }

    };


    fetchProfile();


  },[router]);




  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value,

    });

  };





  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      setSaving(true);


      await updateUserProfile(formData);


      router.push("/profile");


    }catch(err){

      setError(
        "Failed to update profile."
      );


    }finally{

      setSaving(false);

    }

  };





  if(loading){

    return(

      <div className="flex min-h-screen items-center justify-center bg-slate-100">

        <p className="text-lg text-slate-600">
          Loading profile...
        </p>

      </div>

    );

  }





  const initials =
    profile?.name
    ?.split(" ")
    .map(n=>n[0])
    .join("")
    .toUpperCase()
    || "?";






  return (

<div className="min-h-screen bg-slate-100">


{/* Top Banner */}

<div className="h-56 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600"/>



<div className="relative z-10 -mt-32 px-6 pb-16">


<div className="mx-auto max-w-4xl">



{/* Profile Header Card */}

<div className="rounded-3xl bg-white p-8 shadow-xl">


<div className="flex flex-col gap-6 sm:flex-row sm:items-center">



<div className="flex h-28 w-28 items-center justify-center rounded-full bg-sky-600 text-4xl font-bold text-white shadow-lg">

{initials}

</div>



<div>

<h1 className="text-3xl font-bold text-slate-800">

Edit Profile

</h1>


<p className="mt-2 text-slate-500">

Keep your information updated and complete.

</p>


<div className="mt-4 flex items-center gap-2 text-slate-600">

<Mail size={18}/>

{profile?.email}

</div>


</div>



</div>


</div>






{/* Form */}

<div className="mt-8 rounded-3xl bg-white p-8 shadow-xl">


<form
onSubmit={handleSubmit}
className="space-y-7"
>




{error && (

<div className="rounded-xl bg-red-100 p-4 text-red-600">

{error}

</div>

)}





<InputField

icon={<User size={20}/>}

label="Full Name"

name="name"

value={formData.name}

onChange={handleChange}

/>





<InputField

icon={<Phone size={20}/>}

label="Phone Number"

name="phone"

value={formData.phone}

onChange={handleChange}

/>





<InputField

icon={<MapPin size={20}/>}

label="Address"

name="address"

value={formData.address}

onChange={handleChange}

/>





<div>


<label className="mb-2 block font-semibold text-slate-700">

Bio

</label>


<div className="relative">


<FileText className="absolute left-4 top-4 text-slate-400"/>


<textarea

name="bio"

rows="5"

value={formData.bio}

onChange={handleChange}

className="
w-full rounded-xl border
pl-12 pr-4 py-4
outline-none
transition
focus:border-sky-500
focus:ring-2
focus:ring-sky-200
"

/>


</div>


</div>





<div className="flex justify-between pt-6">


<button

type="button"

onClick={()=>router.push("/profile")}

className="
flex items-center gap-2
rounded-xl
border
px-6 py-3
font-medium
hover:bg-slate-100
"

>


<ArrowLeft size={18}/>

Back

</button>





<button

disabled={saving}

className="
flex items-center gap-2
rounded-xl
bg-sky-600
px-7 py-3
font-semibold
text-white
shadow-lg
hover:bg-sky-700
disabled:opacity-50
"

>


<Save size={18}/>


{saving 
? "Saving..."
: "Save Changes"
}


</button>



</div>



</form>



</div>




</div>


</div>


</div>

  );

}






function InputField({
icon,
label,
name,
value,
onChange
}){


return(

<div>

<label className="mb-2 block font-semibold text-slate-700">

{label}

</label>


<div className="relative">


<div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">

{icon}

</div>



<input

name={name}

value={value}

onChange={onChange}

className="
w-full
rounded-xl
border
py-4
pl-12
pr-4
outline-none
transition
focus:border-sky-500
focus:ring-2
focus:ring-sky-200
"

/>


</div>


</div>

);

}