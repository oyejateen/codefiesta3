import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import professionsSkillsData from '../data/professions-skills.json';
import platformData from '../data/platforms.json';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    skills: [] as string[],
    platforms: [] as string[],
  });

  const [professionSearch, setProfessionSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const filteredProfessions = professionsSkillsData.professions.filter(prof =>
    prof.toLowerCase().includes(professionSearch.toLowerCase())
  );

  const filteredSkills = professionsSkillsData.skills.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfessionSelect = (profession: string) => {
    setFormData({ ...formData, profession });
    setProfessionSearch('');
  };

  const handleSkillSelect = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
    setSkillSearch('');
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleAddPlatform = () => {
    setFormData({ ...formData, platforms: [...formData.platforms, ''] });
  };

  const handlePlatformChange = (index: number, value: string) => {
    const updatedPlatforms = [...formData.platforms];
    updatedPlatforms[index] = value;
    setFormData({ ...formData, platforms: updatedPlatforms });
  };

  const handleRemovePlatform = (index: number) => {
    const updatedPlatforms = [...formData.platforms];
    updatedPlatforms.splice(index, 1);
    setFormData({ ...formData, platforms: updatedPlatforms });
  };

  const handleNext = () => {
    console.log('Moving to next step:', step + 1);
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      handleNext();
    } else {
      setIsLoading(true);
      console.log('Form submitted:', formData);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/profile/adele');
      }, 3000);
    }
  };

  const getPlatformIcon = (url: string) => {
    const platform = platformData.find(p => url.includes(p.domain));
    return platform ? platform.icon : '🌐';
  };

  const renderStep = () => {
    console.log('Rendering step:', step);
    switch (step) {
      case 1:
        console.log('Rendering Personal Information');
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </>
        );
      case 2:
        console.log('Rendering Professional Information');
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Professional Information</h3>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Search Profession"
                  value={professionSearch}
                  onChange={(e) => setProfessionSearch(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {professionSearch && (
                  <ul className="mt-2 border rounded max-h-40 overflow-y-auto">
                    {filteredProfessions.map((prof, index) => (
                      <li
                        key={index}
                        onClick={() => handleProfessionSelect(prof)}
                        className="cursor-pointer hover:bg-gray-100 p-2"
                      >
                        {prof}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <p className="font-medium">Selected Profession: {formData.profession}</p>
              </div>
            </div>
          </>
        );
      case 3:
        console.log('Rendering Skills');
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Search Skills"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full p-2 border rounded"
              />
              {skillSearch && (
                <ul className="mt-2 border rounded max-h-40 overflow-y-auto">
                  {filteredSkills.map((skill, index) => (
                    <li
                      key={index}
                      onClick={() => handleSkillSelect(skill)}
                      className="cursor-pointer hover:bg-gray-100 p-2"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </>
        );
      case 4:
        console.log('Rendering Platforms');
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Platforms</h3>
            <div className="space-y-4">
              {formData.platforms.map((platform, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-2xl">{getPlatformIcon(platform)}</span>
                  <input
                    type="url"
                    value={platform}
                    onChange={(e) => handlePlatformChange(index, e.target.value)}
                    placeholder="Platform URL"
                    className="flex-grow p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePlatform(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddPlatform}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Add Platform
              </button>
            </div>
          </>
        );
      default:
        console.log('No matching step found');
        return null;
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-semibold">Creating your profile...</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Sign Up</h2>
          <div className="mb-6 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep() || <div>Loading...</div>}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Previous
                </button>
              )}
              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit
                </button>
              )}
            </div>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Connect with MetaMask
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default SignUp;
