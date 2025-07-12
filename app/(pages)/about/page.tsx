import { client_1, client_2, client_3 } from "@/app/assets/assets";
import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col gap-8 flex-1 h-min overflow-hidden relative w-full p-10 justify-start">
      <div className="flex justify-between items-center p-5 bg-gray-100 text-gray-800 rounded-lg">
        <h1>About Us</h1>
        <p><em>Established: 2020</em></p>
      </div>

      <div>
        <h2>Who We Are</h2>
        <p>
          We are <strong>Aasim Shah</strong>, a dedicated web & app development studio based in Rawalpindi, Pakistan.
          With over 5 years of experience, our mission is to build seamless digital experiences
          that help businesses grow. We specialize in MERN stack development, tailored apps,
          and real-time solutions.
        </p>
      </div>

      <div>
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower entrepreneurs and businesses through customized, user-centric
          digital platforms. We focus on performance, reliability, and ongoing support.
        </p>
      </div>

      <div>
        <h2 className="my-5">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "Aasim Shah", role: "Founder & Lead Developer", img: client_3},
            { name: "Sara Ali", role: "UI/UX Designer", img: client_1},
            { name: "Bilal Khan", role: "Backend Engineer", img: client_2 },
          ].map((member, i) => (
            <div key={i} className="text-center">
                <Image
                  src={member.img}
                  alt={`${member.name} photo`}
                  width={128}
                  height={128}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-2 border-gray-300"
                />
              <h3 className="mt-2 font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-light-gray-2">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Contact & Connect</h2>
        <p>
          Want to learn more? Reach out to us at{" "}
          <a href="mailto:contact@aasimshah.com" className="text-blue-600 hover:underline">
            contact@aasimshah.com
          </a> or connect on LinkedIn.
        </p>
      </div>
    </div>
  );
}
