import React from 'react';
import BannerSlider from './BannerSlider';
import { Typewriter } from 'react-simple-typewriter';
import Marquee from 'react-fast-marquee';

const Home = () => {
  return (
    <section>
        <p className='my-5 bg-fuchsia-200 py-2'>
        <Marquee>
 Start Drafts Early to Avoid Stress! •  78% of Students Who Preview Lectures Score Higher •
   You’ve Completed 12/20 Assignments This Term! •  
</Marquee>
        </p>



      <BannerSlider />

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


<div class="featured-examinee my-5">
  <h2 className='text-center text-2xl italic border'>Featured Qualities of an Examinee</h2>
  <ul className='lg:mx-20 my-10 mx-5'>
   <li><strong>1. Time Management:</strong> Always submits assignments before or on the deadline.</li>
    <li><strong>2. Accuracy & Neatness:</strong> Maintains clear formatting, correct grammar, and a tidy structure.</li>
    <li><strong>3. Creativity:</strong> Brings original ideas and a unique perspective to the assignment.</li>
    <li><strong>4. Subject Understanding:</strong> Demonstrates deep knowledge and insight into the assignment topic.</li>
    <li><strong>5. Consistency:</strong> Performs well across multiple tasks and maintains high standards.</li>
    <li><strong>6. Research Skills:</strong> Uses reliable sources and presents well-organized, factual content.</li>
    <li><strong>7. Communication Skills:</strong> Explains ideas clearly and effectively in both writing and presentation.</li>
    <li><strong>8. Critical Thinking:</strong> Shows the ability to analyze, evaluate, and form reasoned judgments.</li>
    <li><strong>9. Responsibility:</strong> Takes ownership of their learning and tasks seriously.</li>
    <li><strong>10. Feedback Responsiveness:</strong> Accepts feedback positively and improves based on suggestions.</li>
  </ul>
</div>



<div>

    <div className="space-y-4 mx-10 my-6">
        <h1 className='text-3xl text-center font-bold italic '>   Frequently Asked Questions.</h1>
  <div className="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="radio" name="my-accordion-2" defaultChecked />
    <div className="collapse-title font-semibold">How do I create an account?</div>
    <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
  </div>
  
  <div className="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="radio" name="my-accordion-2" />
    <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
    <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
  </div>
  
  <div className="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="radio" name="my-accordion-2" />
    <div className="collapse-title font-semibold">How do I update my profile information?</div>
    <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
  </div>
  
  {/* Assignment-related questions */}
  <div className="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="radio" name="my-accordion-2" />
    <div className="collapse-title font-semibold">How do I create a new assignment?</div>
    <div className="collapse-content text-sm">
      Navigate to the "Assignments" section and click "Create New Assignment". Fill in the details including title, description, due date, and any attachments.
    </div>
  </div>
  
  <div className="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="radio" name="my-accordion-2" />
    <div className="collapse-title font-semibold">Can I set reminders for assignment deadlines?</div>
    <div className="collapse-content text-sm">
      Yes! When creating or editing an assignment, you can enable reminders which will notify you via email and in-app notifications at specified intervals before the due date.
    </div>
  </div>
  
  <div className="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="radio" name="my-accordion-2" />
    <div className="collapse-title font-semibold">How do I submit a completed assignment?</div>
    <div className="collapse-content text-sm">
      Go to the assignment details page and click "Submit Assignment". You can upload files, add comments, or link to external resources before finalizing your submission.
    </div>
  </div>
  
  <div className="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="radio" name="my-accordion-2" />
    <div className="collapse-title font-semibold">What file types can I upload for assignments?</div>
    <div className="collapse-content text-sm">
      We support all common file types including PDF, DOCX, PPTX, XLSX, JPG, PNG, and ZIP files. Maximum file size is 100MB per file.
    </div>
  </div>
  
  <div className="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="radio" name="my-accordion-2" />
    <div className="collapse-title font-semibold">Can I collaborate with others on an assignment?</div>
    <div className="collapse-content text-sm">
      Absolutely! You can invite team members to collaborate on assignments. All collaborators can edit the assignment and see each other's changes in real-time.
    </div>
  </div>
</div>
</div>

<div>

</div>
    </section>
  );
};

export default Home;
