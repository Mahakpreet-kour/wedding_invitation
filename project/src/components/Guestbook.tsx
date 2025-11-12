import { useState, useEffect } from 'react';
import { Heart, Send } from 'lucide-react';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedWishes = localStorage.getItem('weddingWishes');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('weddingWishes', JSON.stringify(updatedWishes));

    setName('');
    setMessage('');

    setTimeout(() => setIsSubmitting(false), 500);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-[#e1b800]/30">
      <h3 className="text-3xl md:text-4xl font-dancing text-[#e1b800] text-center mb-6 flex items-center justify-center gap-2">
        <Heart className="w-8 h-8" fill="#e1b800" />
        Wedding Wishes
        <Heart className="w-8 h-8" fill="#e1b800" />
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-[#e1b800]/30 focus:border-[#e1b800] focus:outline-none transition-colors font-poppins"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">
            Your Wishes
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-[#e1b800]/30 focus:border-[#e1b800] focus:outline-none transition-colors font-poppins resize-none"
            placeholder="Share your heartfelt wishes..."
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-gradient-to-r from-[#e1b800] to-[#d4a600] text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 font-poppins font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? 'Sending...' : 'Send Wishes'}
        </button>
      </form>

      {wishes.length > 0 && (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          <h4 className="text-xl font-poppins font-semibold text-gray-700 mb-4">
            Messages from Guests ({wishes.length})
          </h4>
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="p-4 bg-gradient-to-r from-[#fff8f5] to-[#ffe6f0] rounded-xl shadow-md border border-[#e1b800]/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
                <p className="font-poppins font-semibold text-[#e1b800]">{wish.name}</p>
              </div>
              <p className="font-poppins text-gray-700 italic">{wish.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Guestbook;
