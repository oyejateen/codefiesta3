import React, { useState } from 'react';
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaSoundcloud, FaHeart } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  const profile = {
    name: "Adele Laurie",
    title: "Auteure - compositrice & interprète",
    about: "Adele (born 5 May 1988) is an English singer-songwriter. After graduating from the BRIT School for Performing Arts and Technology in 2006, Adele was given a recording contract by XL Recordings after a friend posted her demo on Myspace the same year. In 2007, she received the Brit Awards \"Critics' Choice\" award and won the BBC Sound of 2008 poll. Her debut album, 19, was released in 2008 to commercial and critical success. It is certified seven times platinum in the UK, and three times platinum in the US. The album contains her first song, \"Hometown Glory\", written when she was 16, which is based on her home suburb of West Norwood in London. An appearance she made on Saturday Night Live in late 2008 boosted her career in the US. At the 51st Grammy Awards in 2009, Adele received the awards for Best New Artist and Best Female Pop Vocal Performance.",
    stats: {
      gigs: "57+",
      reviews: "200+",
      rating: 4.9
    },
    socialMedia: [
      { icon: <FaTwitter />, link: "https://twitter.com/adele" },
      { icon: <FaInstagram />, link: "https://www.instagram.com/adele" },
      { icon: <FaFacebook />, link: "https://www.facebook.com/adele" },
      { icon: <FaYoutube />, link: "https://www.youtube.com/adele" },
      { icon: <FaSoundcloud />, link: "https://soundcloud.com/adele" }
    ],
    reviews: [
      { platform: "Spotify", rating: 5, comment: "Incredible voice and emotional depth!" },
      { platform: "iTunes", rating: 5, comment: "Her music touches the soul." },
      { platform: "YouTube", rating: 5, comment: "One of the best voices of our generation." },
      { platform: "Amazon Music", rating: 5, comment: "Every album is a masterpiece." },
      { platform: "Pandora", rating: 5, comment: "Adele's music is timeless." },
      { platform: "Deezer", rating: 5, comment: "Her lyrics are pure poetry." },
      { platform: "SoundCloud", rating: 5, comment: "Adele never disappoints." },
      { platform: "Google Play Music", rating: 5, comment: "A true artist in every sense." },
      { platform: "Tidal", rating: 5, comment: "Her voice is simply mesmerizing." },
      { platform: "iHeartRadio", rating: 5, comment: "Adele's music speaks to the heart." },
      { platform: "Last.fm", rating: 5, comment: "One of the most talented artists of our time." },
      { platform: "Shazam", rating: 5, comment: "Her songs are instantly recognizable." },
      { platform: "Bandcamp", rating: 5, comment: "Adele's music is a journey of emotions." },
      { platform: "SoundHound", rating: 5, comment: "Her voice is truly one-of-a-kind." },
      { platform: "TuneIn", rating: 5, comment: "Adele's music is a gift to the world." },
      { platform: "Mixcloud", rating: 5, comment: "Her albums are always worth the wait." },
      { platform: "Audiomack", rating: 5, comment: "Adele's talent is unmatched." },
      { platform: "Napster", rating: 5, comment: "Her music resonates with people of all ages." },
      { platform: "LiveXLive", rating: 5, comment: "Adele's live performances are breathtaking." },
      { platform: "TIDAL", rating: 5, comment: "A true icon in the music industry." }
    ]
  };
  
  const [reviews, setReviews] = useState(profile.reviews);

  const handleNewReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating > 0 && newReview.comment) {
      const updatedReviews = [{ platform: 'DRS', ...newReview }, ...reviews];
      setReviews(updatedReviews);
      setNewReview({ rating: 0, comment: '' });
      setShowReviewForm(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => setNewReview({ ...newReview, rating: star })}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    if (activeTab === 'about') {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-2">ABOUT</h2>
          <p className="text-gray-700">{profile.about}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-2">REVIEWS</h2>
          {!showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="mb-4 bg-purple-600 text-white px-4 py-2 rounded-full"
            >
              Write a Review
            </button>
          )}
          {showReviewForm && (
            <form onSubmit={handleNewReview} className="mb-6 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Add a Review for DRS</h3>
              <div className="mb-2">
                {renderStars(newReview.rating)}
              </div>
              <div className="mb-2">
                <textarea
                  placeholder="Comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-full">
                Submit Review
              </button>
            </form>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-bold">{review.platform}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                  <span className="text-gray-400">{'★'.repeat(5 - review.rating)}</span>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg h-48 relative">
        <img
          src="https://example.com/adele-banner.jpg"
          alt=""
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="bg-white rounded-b-lg shadow-lg p-6 relative">
        <img
          src="https://t3.ftcdn.net/jpg/04/28/11/66/360_F_428116625_7bpn1ZTdPnM2iYZgWUsqGIE5pvhUpGYn.jpg"
          alt={profile.name}
          className="w-32 h-32 rounded-full border-4 border-white absolute -top-16 left-6"
        />
        <div className="mt-16">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold mr-2">{profile.name}</h1>
                <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">Singer</span>
              </div>
              <p className="text-gray-600">{profile.title}</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center">
                <FaHeart className="mr-2" /> Add to Favorites
              </button>
              <button className="bg-pink-600 text-white px-4 py-2 rounded-full flex items-center">
                <MdEmail className="mr-2" /> Contact
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="text-center">
              <p className="font-bold">{profile.stats.gigs}</p>
              <p className="text-gray-600">gigs</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{profile.stats.reviews}</p>
              <p className="text-gray-600">reviews</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{profile.stats.rating.toFixed(1)}</p>
              <p className="text-gray-600">avg rating</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Aggregate Platform Ratings</h3>
            <div className="flex items-center">
              <span className="text-3xl text-yellow-500 font-bold mr-2">{profile.stats.rating.toFixed(1)}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < Math.round(profile.stats.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            {profile.socialMedia.map((social, index) => (
              <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600">
                {social.icon}
              </a>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex border-b">
              <button
                className={`py-2 px-4 font-semibold ${
                  activeTab === 'about'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button
                className={`py-2 px-4 font-semibold ${
                  activeTab === 'reviews'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
            <div className="mt-4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
