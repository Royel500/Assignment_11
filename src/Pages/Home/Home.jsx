import React, { useContext } from 'react';
import { ThemeContext } from './../Shear/ThemeProvider';
import { motion } from 'framer-motion';
import BannerSlider from './BannerSlider';
import Marquee from 'react-fast-marquee';
import { Typewriter } from 'react-simple-typewriter';
import AllAssignments from '../../Components/AllAssignments';
import { useLoaderData } from 'react-router';
// Dummy Data for sections
const featuredAssignments = [
  { id: 1, title: "React Basics", difficulty: "easy" },
  { id: 2, title: "Advanced MongoDB", difficulty: "hard" },
];

const recentAssignments = [
  { id: 3, title: "CSS Grid Layout", difficulty: "medium" },
  { id: 4, title: "Node.js APIs", difficulty: "medium" },
];

const categories = ["Frontend", "Backend", "Database", "DevOps", "Design"];


const offers = [
  { id: 1, offer: "Get 10% off on Premium Membership" },
  { id: 2, offer: "Submit 5 Assignments, Get 1 Free Consultation" },
];

// Components for each section:

const FeaturedAssignments = () => (
  <section className="my-10 mx-5">
    <h2 className="text-3xl font-bold mb-4">Featured Assignments</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {featuredAssignments.map(a => (
        <li key={a.id} className="p-4 border rounded shadow-sm  dark:bg-gray-800">
          <h3 className="font-semibold">{a.title}</h3>
          <p>Difficulty: {a.difficulty}</p>
        </li>
      ))}
    </ul>
  </section>
);

const RecentAssignments = () => (
  <section className="my-10 mx-5">
    <h2 className="text-3xl font-bold mb-4">Recent Assignments</h2>
    <ul className="list-disc list-inside">
      {recentAssignments.map(a => (
        <li key={a.id} className="mb-2">
          {a.title} - <em>{a.difficulty}</em>
        </li>
      ))}
    </ul>
  </section>
);

const Categories = () => (
  <section className="my-10 mx-5">
    <h2 className="text-3xl font-bold mb-4">Categories</h2>
    <div className="flex flex-wrap gap-3">
      {categories.map(cat => (
        <span
          key={cat}
          className="px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600"
        >
          {cat}
        </span>
      ))}
    </div>
  </section>
);


const PromotionalBanner = () => (
  <section className="my-10 mx-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-lg text-center">
    <h2 className="text-4xl font-bold mb-2">Special Offer!</h2>
    <p className="text-lg">Sign up today and get 1-month premium access FREE!</p>
  </section>
);

const OffersSection = () => (
  <section className="my-10 mx-5 bg-sky-800 p-6 rounded-lg">
    <h2 className="text-3xl font-bold mb-4">Current Offers</h2>
    <ul className="list-disc list-inside">
      {offers.map(o => (
        <li key={o.id} className="mb-2">{o.offer}</li>
      ))}
    </ul>
  </section>
);

const NewsletterSignup = () => (
  <section className="my-10 mx-5 p-8 border bg-green-600 shadow-blue-700 shadow-md  rounded-lg text-center">
    <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
    <input
      type="email"
      placeholder="Enter your email"
      className="input input-bordered w-72 max-w-full p-2 rounded mr-2"
    />
    <button className="btn btn-primary">Subscribe</button>
  </section>
);

// Main Home component

const Home = () => {

  const data = useLoaderData();

  const { theme } = useContext(ThemeContext);
  // Take only first 6 assignments from data
  const topAssignments = data.slice(0, 6);


  return (
    <main className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className='my-5'>
   <BannerSlider></BannerSlider>
      </div>
   

      {/* ------marque----- */}
      <p className={`my-5 bg-fuchsia-200 py-2 ${
  theme === 'dark' 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-r from-yellow-400 via-yellow-200 text-gray-800'
}`}>

     
             <Marquee>
 Start Drafts Early to Avoid Stress! •  78% of Students Who Preview Lectures Score Higher •
   You’ve Completed 12/20 Assignments This Term! •  
</Marquee> </p>

      <h3 className='text-center text-blue-700 font-bold text-3xl italic mt-20'>
        <Typewriter
          words={['Featured of a Examinee ']}
          loop={0}
          cursor
          cursorStyle='_'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h3>



      {/* New Section: Show 6 Assignments */}
 <section className="my-10 mx-5">
  <h2 className="text-3xl font-bold mb-4 text-center">Top Assignments</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {topAssignments.map(assignment => (
      <div
        key={assignment._id || assignment.id}
        className={`flex border rounded shadow-sm  `}
      >
        {/* Image on the left */}
        <div className="w-1/3">
          <img
            src={assignment.thumbnail  || 'https://via.placeholder.com/150'}
            alt={assignment.title || 'Assignment image'}
            className="object-cover w-full h-full rounded-xl p-1"
            style={{ minHeight: '100px' }}
          />
        </div>

        {/* Details on the right */}
        <div className="p-4 w-2/3 flex flex-col justify-center">
          <h3 className="font-semibold text-lg mb-2">{assignment.title || 'Untitled'}</h3>
          <p>Difficulty: {assignment.difficulty || 'N/A'}</p>
          <p>Marks: {assignment.marks || 'N/A'}</p>
        </div>
      </div>
    ))}
    {topAssignments.length === 0 && (
      <p className="col-span-full text-center text-gray-500">No assignments available.</p>
    )}
  </div>
</section>


      {/* 1. Featured */}
      <FeaturedAssignments />

      {/* 2. Recent */}
      <RecentAssignments />

      {/* 3. Categories */}
      <Categories />

      {/* 4. Blog Preview */}
      {/* <BlogPreview /> */}

      {/* 5. Promotional Banner */}
      <PromotionalBanner />

      {/* 6. Offers */}
      <OffersSection />

      {/* 7. Newsletter */}
      <NewsletterSignup />

       <section className="space-y-4 mx-5 my-10">
    <h2 className="text-3xl text-center font-bold italic mb-6">Frequently Asked Questions</h2>

    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="faq" defaultChecked />
      <div className="collapse-title font-semibold">How do I create an account?</div>
      <div className="collapse-content text-sm">
        Click the "Sign Up" button in the top right corner and follow the registration process.
      </div>
    </div>

    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="faq" />
      <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
      <div className="collapse-content text-sm">
        Click on "Forgot Password" on the login page and follow the instructions sent to your email.
      </div>
    </div>

    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="faq" />
      <div className="collapse-title font-semibold">How do I update my profile information?</div>
      <div className="collapse-content text-sm">
        Go to "My Account" settings and select "Edit Profile" to make changes.
      </div>
    </div>

    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="faq" />
      <div className="collapse-title font-semibold">How do I create a new assignment?</div>
      <div className="collapse-content text-sm">
        Navigate to the "Assignments" section and click "Create New Assignment". Fill in the details including title, description, due date, and any attachments.
      </div>
    </div>

    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="faq" />
      <div className="collapse-title font-semibold">Can I set reminders for assignment deadlines?</div>
      <div className="collapse-content text-sm">
        Yes! Enable reminders when creating or editing an assignment. You’ll receive notifications before the due date.
      </div>
    </div>

    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="faq" />
      <div className="collapse-title font-semibold">How do I submit a completed assignment?</div>
      <div className="collapse-content text-sm">
        Go to the assignment details page and click "Submit Assignment". Upload files and confirm submission.
      </div>
    </div>

    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="faq" />
      <div className="collapse-title font-semibold">What file types can I upload for assignments?</div>
      <div className="collapse-content text-sm">
        PDF, DOCX, PPTX, XLSX, JPG, PNG, and ZIP files are supported. Max 100MB per file.
      </div>
    </div>

    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="faq" />
      <div className="collapse-title font-semibold">Can I collaborate with others on an assignment?</div>
      <div className="collapse-content text-sm">
        Yes! You can invite team members to collaborate. Everyone can edit and track changes.
      </div>
    </div>
  </section>
    </main>
  );
};

export default Home;
