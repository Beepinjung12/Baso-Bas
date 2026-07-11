"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ListRoomClient() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    rentType: "",
    tenancy: "GENERAL",
    rent: "",
    location: "",
    contact: "",
    whatsapp: "",
    facilities: "",
    parking: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);



  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }



  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/rooms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );


      if (!res.ok) {
        throw new Error("Failed to submit");
      }


      setSuccess(true);


      setTimeout(() => {
        router.push("/explore");
      }, 1500);



    } catch (err) {

      alert(
        "Something went wrong. Please try again."
      );

    } finally {

      setSubmitting(false);

    }
  }




  return (
    <main
      style={{
        fontFamily: "Georgia, serif",
        color: "#0f172a",
        background:"#f8fbff",
        minHeight:"100vh",
      }}
    >


      {/* HERO */}

      <section
        style={{
          background:
            "linear-gradient(135deg,#0369a1,#0ea5e9,#7dd3fc)",

          padding:"70px 24px 50px",

          textAlign:"center",

          color:"#fff",

          position:"relative",

          overflow:"hidden",
        }}
      >


        <span
          style={{
            display:"inline-block",

            background:
              "rgba(255,255,255,0.15)",

            border:
              "1px solid rgba(255,255,255,0.4)",

            borderRadius:999,

            padding:"7px 18px",

            fontSize:12,

            letterSpacing:1,

            marginBottom:20,

            fontFamily:"Arial, sans-serif",

          }}
        >

          LIST YOUR ROOM • RENT YOUR ROOM

        </span>




        <h1
          style={{
            fontFamily:"Georgia, serif",

            fontSize:
              "clamp(2rem,4vw,3rem)",

            margin:"0 0 12px",

            fontWeight:700,
          }}
        >

          Rent out your room, effortlessly

        </h1>




        <p
          style={{
            fontFamily:"Arial, sans-serif",

            opacity:0.95,

            fontSize:"1rem",
          }}
        >

          Reach thousands of verified renters and find tenants faster

        </p>



      </section>






      {/* FORM */}


      <section
        style={{
          maxWidth:800,

          margin:"0 auto",

          padding:"48px 24px",
        }}
      >


        <div
          style={{
            background:"#fff",

            borderRadius:20,

            boxShadow:
              "0 15px 40px rgba(15,23,42,0.08)",

            border:
              "1px solid #e2e8f0",

            padding:"35px 30px",
          }}
        >



          <h2
            style={{
              fontFamily:"Georgia, serif",

              fontSize:"1.6rem",

              marginBottom:25,
            }}
          >

            Property Details

          </h2>





          {success ? (

            <div
              style={{
                background:"#ecfdf5",

                border:
                  "1px solid #34d399",

                borderRadius:12,

                padding:20,

                fontFamily:"Arial, sans-serif",

                color:"#065f46",

                textAlign:"center",

                fontWeight:600,
              }}
            >

              ✅ Room rented successfully! Redirecting to Explore...

            </div>



          ) : (


          <form
            onSubmit={handleSubmit}

            style={{
              fontFamily:"Arial, sans-serif",
            }}
          >



            <Field
              label="Room / Flat Type"
              required
            >

              <input

                name="title"

                value={form.title}

                onChange={handleChange}

                placeholder="e.g. 2BHK Flat, Single Room"

                required

                style={inputStyle}

              />

            </Field>






            <Row2>


              <Field
                label="Monthly Rent (Rs.)"
                required
              >

                <input

                  name="rent"

                  type="number"

                  value={form.rent}

                  onChange={handleChange}

                  placeholder="e.g. 10000"

                  required

                  style={inputStyle}

                />

              </Field>





              <Field
                label="Tenancy"
                required
              >

                <select

                  name="tenancy"

                  value={form.tenancy}

                  onChange={handleChange}

                  style={inputStyle}

                >

                  <option value="GENERAL">
                    GENERAL
                  </option>

                  <option value="EXCLUSIVE">
                    EXCLUSIVE
                  </option>

                </select>


              </Field>



            </Row2>






            <Field
              label="Location"
              required
            >

              <input

                name="location"

                value={form.location}

                onChange={handleChange}

                placeholder="e.g. Kathmandu, Nepal"

                required

                style={inputStyle}

              />


            </Field>






            <Row2>


              <Field
                label="Contact Number"
                required
              >

                <input

                  name="contact"

                  value={form.contact}

                  onChange={handleChange}

                  placeholder="Phone number"

                  required

                  style={inputStyle}

                />


              </Field>





              <Field
                label="WhatsApp Number"
              >

                <input

                  name="whatsapp"

                  value={form.whatsapp}

                  onChange={handleChange}

                  placeholder="WhatsApp number"

                  style={inputStyle}

                />


              </Field>


            </Row2>







            <Field
              label="Facilities & Amenities"
            >

              <textarea

                name="facilities"

                value={form.facilities}

                onChange={handleChange}

                rows={3}

                placeholder="WiFi, furniture, parking..."

                style={{
                  ...inputStyle,
                  resize:"vertical",
                }}

              />


            </Field>






            <Field
              label="Parking"
            >

              <input

                name="parking"

                value={form.parking}

                onChange={handleChange}

                placeholder="Bike / Car / None"

                style={inputStyle}

              />

            </Field>







            <Field
              label="Upload Photos"
            >

              <input

                type="file"

                multiple

                accept="image/*"

                style={{
                  ...inputStyle,
                  padding:8,
                }}

              />

            </Field>







            <button

              type="submit"

              disabled={submitting}

              style={{
                width:"100%",

                marginTop:15,

                padding:"14px",

                background:
                  submitting
                  ? "#7dd3fc"
                  : "#0ea5e9",

                color:"#fff",

                border:"none",

                borderRadius:999,

                fontWeight:700,

                fontSize:15,

                cursor:
                  submitting
                  ? "not-allowed"
                  : "pointer",

              }}

            >

              {
                submitting
                ? "Submitting..."
                : "Rent My Room"
              }


            </button>



          </form>


          )}


        </div>


      </section>


    </main>
  );
}






function Field({
  label,
  required,
  children
}) {

  return (

    <div
      style={{
        marginBottom:18,
      }}
    >

      <label
        style={{
          display:"block",

          fontSize:13,

          color:"#475569",

          marginBottom:6,

          fontWeight:600,
        }}
      >

        {label}

        {required &&
          <span style={{color:"#ef4444"}}>
            *
          </span>
        }


      </label>


      {children}


    </div>

  );

}





function Row2({children}) {

  return (

    <div
      style={{
        display:"grid",

        gridTemplateColumns:
          "1fr 1fr",

        gap:16,
      }}
    >

      {children}

    </div>

  );

}





const inputStyle = {

  width:"100%",

  padding:"10px 14px",

  borderRadius:8,

  border:"1px solid #e2e8f0",

  outline:"none",

  fontFamily:"Arial, sans-serif",

  fontSize:14,

  color:"#0f172a",

  boxSizing:"border-box",

};