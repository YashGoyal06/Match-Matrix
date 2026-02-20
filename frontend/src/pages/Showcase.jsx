import { motion } from 'framer-motion';
import LightRays from './LightRays';

const matches = [
  { p1: "Yugandhar Bhangale", p2: "Ojaswita jaiswal", score: 100 },
  { p1: "Rugved", p2: "Mayuri Vyas", score: 100 },
  { p1: "Prakhar Agarwal", p2: "Omkar kumar", score: 95.3 },
  { p1: "Bhupendra Mewara", p2: "Rishiraj Singh Kumpawat", score: 95.3 },
  { p1: "SHiwendra", p2: "Abhinav Singh", score: 94.5 },
  { p1: "Prerita", p2: "Anusha", score: 93.1 },
  { p1: "Jai Sri Santhosh Kumar", p2: "Shah Khush", score: 92.5 },
  { p1: "Kanav", p2: "Mayank Yadav", score: 92.4 },
  { p1: "Omkar", p2: "Prakhar", score: 91.2 },
  { p1: "Samridh Mishra", p2: "Prafull Chaturvedi", score: 90.7 },
  { p1: "Abhimanyu Singh", p2: "Devashish", score: 90.1 },
  { p1: "Shagun", p2: "Pratyush Dubey", score: 89 },
  { p1: "Rohit Pandey", p2: "Hardik Sharma", score: 88.8 },
  { p1: "Ayush Kumar", p2: "Saransh Mathur", score: 88.5 },
  { p1: "Hrishita", p2: "Kuhu", score: 88.1 },
  { p1: "Ayesha", p2: "Naivedya", score: 87.7 },
  { p1: "Tushar", p2: "Ishan", score: 86.9 },
  { p1: "Pratyush Dubey", p2: "Shagun Singh", score: 86 },
  { p1: "Atharva Desai", p2: "Hemil", score: 85.4 },
  { p1: "Adish jain", p2: "Ankit paul", score: 84.6 },
  { p1: "Raj pratap singh", p2: "Hasith", score: 83.7 },
  { p1: "Divyanshu Verma", p2: "Bhumika Verma", score: 82.3 },
  { p1: "Dilisha", p2: "Aryan Amit Arya", score: 81.3 },
  { p1: "Divya Pal", p2: "Plansha", score: 81.3 },
  { p1: "Sousthab Mitra", p2: "Divya", score: 81.3 },
  { p1: "Aayush kumar", p2: "Saransh Mathur", score: 81.3 },
  { p1: "bhupendra", p2: "Yajit Kataria", score: 81.2 },
  { p1: "Saanvi", p2: "Subham", score: 79.8 },
  { p1: "sdasda", p2: "asdasdsa", score: 76.7 },
  { p1: "Vansh singhal", p2: "Suraj Bisht", score: 76.7 },
  { p1: "Krish Kumar", p2: "DULAM ANVESH GOUD", score: 72 },
  { p1: "Lakshya Agarwal", p2: "Shivansh Dixit", score: 72 },
  { p1: "ATHARVA DESAI", p2: "HEMIL SHAH", score: 72 },
  { p1: "Thumma Jai sri Santhosh kumar", p2: "Shah Khush Shilpan", score: 72 },
  { p1: "Shivam Choubey", p2: "Siddhesh Rawat", score: 72 },
  { p1: "Snehil Sahay", p2: "Siya Panwar", score: 72 },
  { p1: "Shiwendra", p2: "Saanvi Mittal", score: 67.3 },
  { p1: "Abhimanyu Singh", p2: "Vardaan Yadav", score: 67.3 },
  { p1: "Vishesh shukla", p2: "Arth Mishra", score: 67.3 },
  { p1: "Mayank Sharma", p2: "Shivam Kumar", score: 67.3 },
  { p1: "Rohit pandey", p2: "Harsh Sahu", score: 67.3 },
  { p1: "Deepak Shukla", p2: "Adnan Shakil", score: 62.7 },
  { p1: "Adish jain", p2: "Prateek tripathi", score: 62.7 },
  { p1: "Harshit Shrimali", p2: "Vaishnavi Mishra", score: 62.7 },
  { p1: "Sumaiya Shabab", p2: "Prastut", score: 62.7 },
  { p1: "Apoorva krishna tripathi", p2: "Raj Pratap Singh", score: 62.7 },
  { p1: "Kunjkumar Savani", p2: "Yajat kataria", score: 62.7 },
  { p1: "Kanav Luthra", p2: "Vaibhav Sharma", score: 62.7 },
  { p1: "Sarang Krishna M Suresh", p2: "Arghyadeep Gope", score: 62.7 },
  { p1: "Alankrit Sajwan", p2: "Prassan", score: 62.7 },
  { p1: "Abhishek Sivan", p2: "Dhruv Tanwar", score: 58 },
  { p1: "TUSHAR SOLANKI", p2: "KUNAL PARIHAR", score: 58 },
  { p1: "Deepak", p2: "Hardik Sharma", score: 58 },
  { p1: "Naivedya singh", p2: "Rahul Singh", score: 58 },
  { p1: "Siddharth Dubey", p2: "Deepak singh", score: 58 },
  { p1: "Lokesh Kewat", p2: "Swadhin", score: 58 },
  { p1: "Divyansh Verma", p2: "Divyansh Verma", score: 58 },
  { p1: "Tanishka Jain", p2: "Abhishek Pathak", score: 58 },
  { p1: "Hasith Jaligapu", p2: "Nageshwar reddy", score: 53.3 },
  { p1: "Uday Pratap Singh", p2: "Aditya Patidar", score: 53.3 },
  { p1: "Ved", p2: "Bhavesh wadhwani", score: 53.3 },
  { p1: "Swara kale", p2: "Hansini", score: 53.3 },
  { p1: "Nived Nangelil", p2: "Aryan Mishra", score: 53.3 },
  { p1: "Pranav Purwar", p2: "Ayesha", score: 53.3 },
  { p1: "bharath kumar", p2: "Abhinav Singh", score: 53.3 },
  { p1: "Mohit", p2: "Siddhartha Singh", score: 53.3 },
  { p1: "Saurav kumar", p2: "Shivansh Pandey", score: 53.3 },
  { p1: "Devashish Rege", p2: "Hardik Sharma", score: 53.3 },
  { p1: "Lakshay", p2: "Aaron Abey varghese", score: 48.7 },
  { p1: "Ankit Paul", p2: "Prince singhal", score: 48.7 },
  { p1: "Piyush", p2: "Saanya Mittal", score: 48.7 },
  { p1: "Tapish Upadhyay", p2: "Aditya Patidar", score: 48.7 },
  { p1: "Ishan Haswani", p2: "Ksihd", score: 48.7 },
  { p1: "Preeti Chauhan", p2: "Atul Ranjan Singh", score: 48.7 },
  { p1: "Hrishita", p2: "Kuhu", score: 48.7 },
  { p1: "Divyansh arora", p2: "Maanas Srivastava", score: 44 },
  { p1: "Adnan Shakil", p2: "Harshit Kumar", score: 44 },
  { p1: "ADITYA AMAN", p2: "Ritika", score: 44 },
  { p1: "Kushagra Sharma", p2: "Souradeep Datta", score: 44 },
  { p1: "Harsh Yadav", p2: "Deepak Shukla", score: 44 },
  { p1: "Subham Roy", p2: "asdasdas", score: 39.3 },
  { p1: "Prince singhal", p2: "Bhumika Aswal", score: 39.3 }
];

const Showcase = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0e1a] text-white flex flex-col font-space overflow-hidden py-12 px-4">
      <div className="absolute inset-0 z-0 opacity-50">
        <LightRays raysColor="#00ff88" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00b8ff]">
            OFFICIAL MATCH RESULTS
          </h1>
          <p className="text-gray-400 font-mono">ALL SECURED PAIRINGS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 20) * 0.05 }} // modulo ensures animation doesn't delay too long for later items
              className="bg-[#0f1623]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-center items-center text-center hover:border-[#00ff88]/50 transition-colors"
            >
              <div className="text-lg font-bold text-white mb-2">
                {match.p1}
              </div>
              <div className="text-[#00ff88] font-mono text-sm mb-2">
                ⚔️ SYNCED ⚔️
              </div>
              <div className="text-lg font-bold text-white">
                {match.p2}
              </div>
              <div className="mt-4 text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                Compatibility: {match.score}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Showcase;
