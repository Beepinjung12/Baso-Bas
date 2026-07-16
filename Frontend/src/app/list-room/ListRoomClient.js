"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "@/app/api/rooms";

export default function ListRoomClient() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    rent: "",
    rentType: "Monthly",
    tenancy: "Anyone",
    roomSize: "",
    numberOfRooms: 1,
    parking: false,
    facilities: "",
    contact: "",
    whatsapp: "",
    image: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    // Validation
    if (form.title.trim().length < 3) {
      setError("Room title must be at least 3 characters");
      return;
    }

    if (!form.location.trim()) {
      setError("Location is required");
      return;
    }

    if (!form.rent || Number(form.rent) <= 0) {
      setError("Enter a valid rent amount");
      return;
    }

    if (!form.contact.trim()) {
      setError("Contact number is required");
      return;
    }

    setSubmitting(true);

    try {
      await createRoom(
        {
          title: form.title,
          location: form.location,
          description: form.description,
          rent: Number(form.rent),
          rentType: form.rentType,
          tenancy: form.tenancy,
          roomSize: form.roomSize,
          numberOfRooms: Number(form.numberOfRooms),
          parking: form.parking,
          facilities: form.facilities,
          contact: form.contact,
          whatsapp: form.whatsapp,
        },
        imageFiles
      );
      setSuccess(true);
      setToast("Room listed successfully 🎉");

      setTimeout(() => {
        router.push("/explore");
      }, 2000);
    } catch (err) {
        console.log("CREATE ROOM ERROR:", err);

        setError(
          err?.response?.data?.message ||
          err.message ||
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
        background: "#f8fbff",
        minHeight: "100vh",
      }}
    >
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#0ea5e9",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 12,
            fontWeight: 600,
            zIndex: 9999
          }}
        >
          {toast}
        </div>
      )}

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg,#0369a1,#0ea5e9,#7dd3fc)",
          padding: "70px 24px 50px",
          textAlign: "center",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 999,
            padding: "7px 18px",
            fontSize: 12,
            letterSpacing: 1,
            marginBottom: 20,
            fontFamily: "Arial, sans-serif",
          }}
        >
          LIST YOUR ROOM • RENT YOUR ROOM
        </span>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            margin: "0 0 12px",
            fontWeight: 700,
          }}
        >
          Rent out your room, effortlessly
        </h1>

        <p
          style={{
            fontFamily: "Arial, sans-serif",
            opacity: 0.95,
            fontSize: "1rem",
          }}
        >
          Reach thousands of verified renters and find tenants faster
        </p>
      </section>

      {/* FORM */}
      <section
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 15px 40px rgba(15,23,42,0.08)",
            border: "1px solid #e2e8f0",
            padding: "35px 30px",
          }}
        >
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.6rem",
              marginBottom: 25,
            }}
          >
            Property Details
          </h2>

          {success ? (
            <div
              style={{
                background: "#ecfdf5",
                border: "1px solid #34d399",
                borderRadius: 12,
                padding: 20,
                fontFamily: "Arial, sans-serif",
                color: "#065f46",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              ✅ Room rented successfully! Redirecting to Explore...
            </div>
          ) : (
            <>
              {error && (
                <div
                  style={{
                    background: "#fee2e2",
                    color: "#991b1b",
                    padding: "12px",
                    borderRadius: 10,
                    marginBottom: 20,
                    fontWeight: 600
                  }}
                >
                  {error}
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                style={{
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <Field label="Room / Flat Type" required>
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
                    <Field label="Contact Number" required>
                      <input
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        placeholder="Phone number"
                        required
                        style={inputStyle}
                      />
                    </Field>

                    <Field label="WhatsApp Number">
                      <input
                        name="whatsapp"
                        value={form.whatsapp}
                        onChange={handleChange}
                        placeholder="WhatsApp number"
                        style={inputStyle}
                      />
                    </Field>
                  </Row2>
                <Row2>
                  <Field label="Monthly Rent (Rs.)" required>
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

                  <Field label="Rent Type">
                    <select
                      name="rentType"
                      value={form.rentType}
                      onChange={handleChange}
                      style={inputStyle}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Daily">Daily</option>
                    </select>
                  </Field>
                </Row2>

                <Field label="Location" required>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Kathmandu, Nepal"
                    required
                    style={inputStyle}
                  />
                </Field>

                <Field label="Tenancy">
                  <select
                    name="tenancy"
                    value={form.tenancy}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="Anyone">Anyone</option>
                    <option value="Family">Family</option>
                    <option value="Students">Students</option>
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                  </select>
                </Field>

                <Row2>
                  <Field label="Room Size">
                    <input
                      name="roomSize"
                      value={form.roomSize}
                      onChange={handleChange}
                      placeholder="e.g. 250 sqft"
                      style={inputStyle}
                    />
                  </Field>

                  <Field label="Number of Rooms">
                    <input
                      type="number"
                      name="numberOfRooms"
                      value={form.numberOfRooms}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </Field>
                </Row2>

                <Field label="Facilities & Amenities">
                  <textarea
                    name="facilities"
                    value={form.facilities}
                    onChange={handleChange}
                    rows={3}
                    placeholder="WiFi, furniture, parking..."
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                    }}
                  />
                </Field>

                <Field label="Parking Available">
                  <select
                    name="parking"
                    value={form.parking}
                    onChange={(e) =>
                      setForm(prev => ({
                        ...prev,
                        parking: e.target.value === "true"
                      }))
                    }
                    style={inputStyle}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </Field>

                <Field label="Upload Photos">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const selected = Array.from(e.target.files || []);
                      const limited = [...imageFiles, ...selected].slice(0, 5);

                      setImageFiles(limited);

                      setPreviewImages(
                        limited.map(file => URL.createObjectURL(file))
                      );

                      e.target.value = "";
                    }}
                    style={{
                      ...inputStyle,
                      padding: 8,
                    }}
                  />
                  {imageFiles.length > 0 && (
                    <p style={{ marginTop: 8, fontSize: 13, color: "#0369a1" }}>
                      {imageFiles.length} photo{imageFiles.length > 1 ? "s" : ""} selected
                    </p>
                  )}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(5,1fr)",
                      gap: 10,
                      marginTop: 15
                    }}
                  >
                    {previewImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="preview"
                        style={{
                          width: "100%",
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 10
                        }}
                      />
                    ))}
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    marginTop: 15,
                    padding: "14px",
                    background: submitting ? "#7dd3fc" : "#0ea5e9",
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "Submitting..." : "Rent My Room"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({ label, required, children }) {
  return (
    <div
      style={{
        marginBottom: 18,
      }}
    >
      <label
        style={{
          display: "block",
          fontSize: 13,
          color: "#475569",
          marginBottom: 6,
          fontWeight: 600,
        }}
      >
        {label}
        {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>

      {children}
    </div>
  );
}

function Row2({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}
    >
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  outline: "none",
  fontFamily: "Arial, sans-serif",
  fontSize: 14,
  color: "#0f172a",
  boxSizing: "border-box",
};