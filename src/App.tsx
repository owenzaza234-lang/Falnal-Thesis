import React, { useState, useEffect } from 'react';
import { MapPin, User, Facebook, Mail, Music2, Video, MonitorPlay, Star, ArrowRight, Quote, ChefHat, ArrowLeft, PlayCircle, Clock, Edit2, X, Save, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// กำหนด URL ของรูปภาพโลโก้ที่นี่
const LOGO_URL = "https://cdn.discordapp.com/attachments/830477489871519824/1491058092652368052/image_2026-03-14_105139410.png?ex=69d64f8f&is=69d4fe0f&hm=780907d0fdec26554f6982e85521194de9116cd95a1e1ac54b79b669e3dc71fa&";
const NAV_LOGO_URL = LOGO_URL;

// Component สำหรับโหลดรูปภาพ ถ้าไม่มีรูปในโฟลเดอร์ให้ใช้รูปสำรอง (Fallback)
const ImageWithFallback = ({ src, fallbackSrc, alt, className, ...props }: any) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  // Reset image source if src prop changes
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img 
      src={imgSrc} 
      onError={() => setImgSrc(fallbackSrc)} 
      alt={alt} 
      className={className} 
      {...props} 
    />
  );
};

// ข้อมูลร้านอาหารเริ่มต้น 10 ร้าน
const INITIAL_RESTAURANTS = [
  { id: 1, title: "สเต็กเนื้อนุ่ม", img: "public/restaurants/1/1.png", fallbackImg: "https://picsum.photos/seed/steak/600/800", rating: "4.8", price: "฿฿", desc: "สเต็กเนื้อนุ่มละมุนลิ้น ย่างเตาถ่านหอมๆ เสิร์ฟพร้อมเฟรนช์ฟรายส์และสลัดผักสดออร์แกนิก บรรยากาศร้านชิลๆ เหมาะกับการมาทานกับเพื่อนหลังเลิกเรียน", tags: ["สเต็ก", "อาหารฝรั่ง"], time: "11:00 - 22:00 น.", videoUrl: "" },
  { id: 2, title: "ของทอดทานเล่น", img: "public/restaurants/2/2.png", fallbackImg: "https://picsum.photos/seed/fried/600/800", rating: "4.5", price: "฿", desc: "รวมมิตรของทอดกรอบอร่อย ทั้งเกี๊ยวทอด ลูกชิ้นทอด และไก่ทอด คลุกผงแซ่บๆ หลากหลายรสชาติ ทอดใหม่ร้อนๆ ทุกออเดอร์", tags: ["ของทานเล่น", "สตรีทฟู้ด"], time: "15:00 - 23:00 น.", videoUrl: "" },
  { id: 3, title: "ก๋วยเตี๋ยวรสเด็ด", img: "public/restaurants/3/3.png", fallbackImg: "https://picsum.photos/seed/noodle/600/800", rating: "4.9", price: "฿", desc: "ก๋วยเตี๋ยวต้มยำน้ำข้น รสชาติจัดจ้าน เครื่องแน่น หมูสับเน้นๆ ไข่ตานีเยิ้มๆ เส้นเหนียวนุ่ม ซดน้ำซุปคล่องคอสุดๆ", tags: ["เส้น", "ต้มยำ"], time: "09:00 - 20:00 น.", videoUrl: "" },
  { id: 4, title: "ข้าวมันไก่สูตรไหหลำ", img: "public/restaurants/4/4.png", fallbackImg: "https://picsum.photos/seed/chickenrice/600/800", rating: "4.7", price: "฿", desc: "ข้าวมันหอมนุ่ม ไก่ต้มเนื้อฉ่ำ ไม่ตบไก่ให้แบน น้ำจิ้มรสเด็ดสูตรต้นตำรับ พร้อมน้ำซุปฟักร้อนๆ ซดคล่องคอ", tags: ["จานเดียว", "ไก่"], time: "07:00 - 15:00 น.", videoUrl: "" },
  { id: 5, title: "หมูกระทะบุฟเฟต์", img: "/restaurants/5/5.png", fallbackImg: "https://picsum.photos/seed/thaibbq/600/800", rating: "4.6", price: "฿฿", desc: "อิ่มไม่อั้นกับหมูกระทะเตาถ่าน หมูหมักนุ่มๆ สามชั้นสไลด์ และของทานเล่นเพียบ น้ำจิ้มสุกี้รสเด็ด เติมของตลอดไม่มีกั๊ก", tags: ["บุฟเฟต์", "ปิ้งย่าง"], time: "16:00 - 24:00 น.", videoUrl: "" },
  { id: 6, title: "ยำแซ่บซี๊ด", img: "/restaurants/6/6.png", fallbackImg: "https://picsum.photos/seed/spicysalad/600/800", rating: "4.8", price: "฿฿", desc: "ยำรสแซ่บจัดจ้าน ปลาร้านัวๆ เครื่องแน่นทั้งกุ้งสด หมูยอ ไข่แดงเค็ม เลือกระดับความเผ็ดได้ตามใจชอบ", tags: ["ยำ", "รสจัด"], time: "11:00 - 21:00 น.", videoUrl: "" },
  { id: 7, title: "คาเฟ่ขนมหวาน", img: "/restaurants/7/7.png", fallbackImg: "https://picsum.photos/seed/cafe/600/800", rating: "4.9", price: "฿฿", desc: "คาเฟ่สไตล์มินิมอล มีทั้งเค้ก บิงซู และเครื่องดื่มหลากหลาย มุมถ่ายรูปเพียบ เหมาะสำหรับมานั่งอ่านหนังสือหรือคุยงาน", tags: ["คาเฟ่", "ของหวาน"], time: "10:00 - 20:00 น.", videoUrl: "" },
  { id: 8, title: "อาหารตามสั่งป้าสม", img: "/restaurants/8/8.png", fallbackImg: "https://picsum.photos/seed/thaifood/600/800", rating: "4.5", price: "฿", desc: "ร้านอาหารตามสั่งเจ้าเด็ด ข้าวกะเพราหมูกรอบไข่ดาวเยิ้มๆ ให้เยอะจุใจ รสชาติเข้มข้น ราคาเป็นมิตรกับนักศึกษา", tags: ["ตามสั่ง", "จานด่วน"], time: "08:00 - 18:00 น.", videoUrl: "" },
  { id: 9, title: "ชาบูหม้อไฟ", img: "/restaurants/9/9.png", fallbackImg: "https://picsum.photos/seed/shabu/600/800", rating: "4.7", price: "฿฿฿", desc: "ชาบูน้ำซุปเข้มข้น เนื้อสไลด์พรีเมียม หมูคุโรบูตะ พร้อมน้ำจิ้มพอนสึและสุกี้ มีทั้งแบบ A La Carte และ Buffet", tags: ["ชาบู", "หม้อไฟ"], time: "11:00 - 22:00 น.", videoUrl: "" },
  { id: 10, title: "โรตีชาชัก", img: "public/restaurants/10/10-1.png", fallbackImg: "https://picsum.photos/seed/roti/600/800", rating: "4.6", price: "฿", desc: "โรตีกรอบนอกนุ่มใน ราดนมข้นหวานฉ่ำๆ ทานคู่กับชาชักรสเข้มข้น หอมกลิ่นชา เมนูแนะนำ: โรตีทิชชู่และชาชักเย็น", tags: ["ของหวาน", "เครื่องดื่ม"], time: "17:00 - 23:30 น.", videoUrl: "" },
];

// Helper function สำหรับแปลง URL วิดีโอ YouTube ให้เป็น Embed URL
const getEmbedUrl = (url: string) => {
  if (!url) return '';
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  return url;
};

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-light flex items-center justify-center overflow-hidden relative"
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green to-transparent" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative z-10"
      >
        <img src={LOGO_URL} alt="Main Logo" className="w-72 h-72 object-contain drop-shadow-2xl" referrerPolicy="no-referrer" />
      </motion.div>
    </motion.div>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-green/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 z-10"
      >
        <img src={LOGO_URL} alt="Main Logo" className="w-56 h-56 object-contain drop-shadow-xl" referrerPolicy="no-referrer" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 z-10 space-y-5"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">ยินดีต้อนรับ</h2>
          <p className="text-gray-500 text-sm mt-1">เข้าสู่ระบบเพื่อดูรีวิวร้านอาหารเด็ดๆ</p>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="อีเมล (@gmail.com)"
            className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button className="flex-1 bg-brand-light text-brand-green border border-brand-green/20 font-bold py-3.5 rounded-2xl hover:bg-brand-green/10 transition-colors active:scale-[0.98]">
            สมัครสมาชิก
          </button>
          <button
            onClick={onLogin}
            className="flex-1 bg-brand-green text-white font-bold py-3.5 rounded-2xl hover:bg-[#0d5234] shadow-lg shadow-brand-green/30 transition-all active:scale-[0.98]"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Modal สำหรับแก้ไขข้อมูลร้านอาหาร
const EditRestaurantModal = ({ restaurant, onSave, onClose }: any) => {
  const [formData, setFormData] = useState({
    ...restaurant,
    tags: restaurant.tags.join(', ') // แปลง array เป็น string เพื่อให้แก้ไขง่าย
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // แปลง tags กลับเป็น array
    const updatedRestaurant = {
      ...formData,
      tags: formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    };
    onSave(updatedRestaurant);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Edit2 className="w-6 h-6 text-brand-green" /> แก้ไขข้อมูลร้านอาหาร
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <form id="edit-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">ชื่อร้าน</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/50 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">คะแนน (เช่น 4.8)</label>
                <input required type="text" name="rating" value={formData.rating} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/50 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">ราคา (เช่น ฿฿)</label>
                <input required type="text" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/50 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">เวลาเปิด-ปิด</label>
                <input required type="text" name="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/50 outline-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">หมวดหมู่ / แท็ก (คั่นด้วยลูกน้ำ ,)</label>
              <input required type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="เช่น สเต็ก, อาหารฝรั่ง" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/50 outline-none" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">URL รูปภาพสำรอง (Fallback Image)</label>
              <input required type="text" name="fallbackImg" value={formData.fallbackImg} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/50 outline-none" />
              <p className="text-xs text-gray-500">รูปนี้จะแสดงเมื่อไม่มีรูปในโฟลเดอร์ public/restaurants/{formData.id}/cover.jpg</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">URL วิดีโอรีวิว (YouTube Link)</label>
              <input type="text" name="videoUrl" value={formData.videoUrl || ''} onChange={handleChange} placeholder="เช่น https://www.youtube.com/watch?v=..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/50 outline-none" />
              <p className="text-xs text-gray-500">ใส่ลิงก์ YouTube เพื่อแสดงวิดีโอในหน้ารายละเอียดร้าน (เว้นว่างได้)</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">รายละเอียดร้าน / รีวิว</label>
              <textarea required name="desc" value={formData.desc} onChange={handleChange} rows={4} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/50 outline-none resize-none"></textarea>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">
            ยกเลิก
          </button>
          <button type="submit" form="edit-form" className="px-6 py-2.5 rounded-xl font-bold bg-brand-green text-white hover:bg-[#0d5234] transition-colors flex items-center gap-2 shadow-lg shadow-brand-green/20">
            <Save className="w-5 h-5" /> บันทึกข้อมูล
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const RestaurantDetail = ({ restaurant, onBack }: { restaurant: typeof INITIAL_RESTAURANTS[0], onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen bg-[#fafafa] flex flex-col font-sans pb-20"
    >
      {/* Detail Navbar */}
      <nav className="bg-white/90 backdrop-blur-md text-gray-800 px-6 py-4 flex items-center sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-brand-green transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> ย้อนกลับ
        </button>
        <div className="mx-auto font-bold text-lg text-gray-900 truncate px-4">{restaurant.title}</div>
        <div className="w-24"></div> {/* Spacer to balance flex */}
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {/* Hero Image */}
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg mb-8 group">
          <ImageWithFallback src={restaurant.img} fallbackSrc={restaurant.fallbackImg} alt={restaurant.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <PlayCircle className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{restaurant.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> {restaurant.rating}
                </div>
                <div className="bg-brand-green/10 text-brand-green px-3 py-1 rounded-full font-bold">
                  {restaurant.price}
                </div>
                <div className="flex items-center gap-1 text-gray-500 font-medium">
                  <MapPin className="w-4 h-4" /> ย่านบางบัว
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {restaurant.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">รีวิวร้าน</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {restaurant.desc}
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <Clock className="w-6 h-6 text-brand-green" />
              <div>
                <div className="font-bold text-gray-900 text-sm">เวลาเปิด-ปิด</div>
                <div className="font-medium">{restaurant.time}</div>
              </div>
            </div>
          </div>

          {restaurant.videoUrl ? (
            <div className="mt-10 rounded-2xl overflow-hidden shadow-lg aspect-video w-full bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src={getEmbedUrl(restaurant.videoUrl)} 
                title="Video Review" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <button className="w-full mt-10 bg-gray-100 text-gray-400 font-bold py-4 rounded-2xl cursor-not-allowed flex items-center justify-center gap-2 text-lg">
              <Video className="w-5 h-5" /> ยังไม่มีวิดีโอรีวิว
            </button>
          )}
        </div>
      </main>
    </motion.div>
  );
};

const MainPage = ({ 
  restaurants, 
  onSelectRestaurant, 
  isEditMode, 
  onToggleEditMode,
  onEditRestaurant
}: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fafafa] flex flex-col font-sans"
    >
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md text-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <img src={NAV_LOGO_URL} alt="Nav Logo" className="h-12 w-auto object-contain drop-shadow-md" referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <a href="#" className="text-brand-green flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> หน้าแรก
          </a>
          <a href="#" className="hover:text-brand-green transition-colors">เกี่ยวกับเรา</a>
          <a 
            href="#restaurants-section" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('restaurants-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-brand-green transition-colors"
          >
            วิดีโอรีวิว
          </a>
          <a 
            href="#contact-section" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-brand-green transition-colors"
          >
            ติดต่อ
          </a>
        </div>
        <div className="flex items-center gap-3">
          {/* ปุ่มรีเซ็ตข้อมูล (แสดงเฉพาะในโหมดแก้ไข) */}
          {isEditMode && (
            <button 
              onClick={() => {
                if(window.confirm('คุณต้องการล้างข้อมูลที่แก้ไขไว้ทั้งหมด และกลับไปใช้ข้อมูลเริ่มต้นใช่หรือไม่?')) {
                  localStorage.removeItem('restaurantsData');
                  window.location.reload();
                }
              }}
              className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full transition-colors border bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
            >
              <X className="w-4 h-4" /> รีเซ็ตข้อมูล
            </button>
          )}

          {/* ปุ่มเปิด/ปิด โหมดแก้ไข */}
          <button 
            onClick={onToggleEditMode}
            className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full transition-colors border ${isEditMode ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'}`}
          >
            <Settings className="w-4 h-4" /> {isEditMode ? 'ปิดโหมดแก้ไข' : 'โหมดแก้ไข'}
          </button>
          
          <button className="flex items-center gap-2 text-sm font-bold bg-brand-green text-white px-5 py-2 rounded-full hover:bg-[#0d5234] transition-colors shadow-md shadow-brand-green/20">
            <User className="w-4 h-4" /> เข้าสู่ระบบ
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 flex items-center justify-center overflow-hidden bg-brand-light">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-3xl"></div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center flex flex-col items-center"
        >
          <img src={LOGO_URL} alt="Hero Logo" className="w-80 h-80 object-contain drop-shadow-2xl mb-8" referrerPolicy="no-referrer" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            รวมร้านเด็ด <span className="text-brand-green">ย่านบางบัว</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium max-w-md">
            รีวิวร้านอาหารอร่อย ราคาโดนใจ สำหรับชาว ม.ศรีปทุม
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-20 space-y-24">
        
        {/* Goal */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-gray-100 text-center max-w-4xl mx-auto"
        >
          <Quote className="absolute top-8 left-8 text-brand-green/10 w-20 h-20 -z-0" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-brand-green/10 rounded-2xl mb-6 text-brand-green">
              <ChefHat className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">จุดประสงค์ของเรา</h2>
            <p className="text-gray-600 leading-relaxed font-medium text-lg md:text-xl">
              ปัจจุบันเด็กจบใหม่ที่มาเข้าเรียนใหม่ใน <span className="text-brand-green font-bold">มหาลัยศรีปทุม</span> ยังไม่รู้ว่ามีร้านอาหารที่อร่อย
              และเด็ดแถวย่านบางบัว การนำเสนอเป็นวิดีโอผสมโมชั่นจะทำให้เด็กๆสนใจว่า
              แถวย่านบางบัวมีร้านอาหารที่อร่อยและราคาไม่แพงจนเกินไป ทำให้นักเรียนนักศึกษาเข้าถึงได้ง่าย
            </p>
          </div>
        </motion.section>

        {/* Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
          >
            <div className="w-20 h-20 bg-brand-yellow/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Video className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">สิ่งที่จะมีในคลิป</h3>
            <p className="text-gray-500 font-medium">รีวิวบรรยากาศ เมนูเด็ด และราคา</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
          >
            <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <MonitorPlay className="w-10 h-10 text-brand-green" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">สื่อที่จะใช้</h3>
            <p className="text-gray-500 font-medium">วิดีโอสั้น TikTok, Reels, Shorts</p>
          </motion.div>
        </section>

        {/* Restaurants */}
        <section id="restaurants-section" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <MapPin className="text-brand-green w-8 h-8" /> ร้านอาหารแนะนำ
            </h2>
            <div className="text-gray-500 font-medium">ทั้งหมด {restaurants.length} ร้าน</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {restaurants.map((item: any, idx: number) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.1 }}
                className="group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white border border-gray-100 flex flex-col relative"
              >
                {/* ปุ่มแก้ไข (แสดงเฉพาะตอนเปิดโหมดแก้ไข) */}
                {isEditMode && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onEditRestaurant(item); }}
                    className="absolute top-4 left-4 z-20 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-110 transition-all"
                    title="แก้ไขข้อมูลร้าน"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                )}

                <div 
                  className="aspect-[4/5] relative overflow-hidden cursor-pointer"
                  onClick={() => !isEditMode && onSelectRestaurant(item)}
                >
                  <ImageWithFallback src={item.img} fallbackSrc={item.fallbackImg} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm z-10">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-800">{item.rating}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-5 z-10">
                    <span className="text-white font-bold text-xl mb-1 translate-y-2 group-hover:translate-y-0 transition-transform">{item.title}</span>
                    <div className="flex items-center gap-2 text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      <span className="bg-brand-green/80 text-white px-2 py-0.5 rounded text-xs font-bold">{item.price}</span>
                      <span>{isEditMode ? 'คลิกปุ่มสีเหลืองเพื่อแก้ไข' : 'คลิกเพื่อดูรีวิว'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact-section" className="bg-gray-900 text-white pt-16 pb-8 px-6 mt-auto rounded-t-[3rem]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-gray-800 pb-12">
            <div className="space-y-4">
              <img src={NAV_LOGO_URL} alt="Footer Logo" className="h-16 w-auto object-contain brightness-0 invert opacity-90" referrerPolicy="no-referrer" />
              <p className="text-gray-400 font-medium max-w-xs">
                แหล่งรวมรีวิวร้านอาหารเด็ดๆ ย่านบางบัว สำหรับนักศึกษามหาวิทยาลัยศรีปทุม
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">ช่องทางการติดต่อ</h4>
              <div className="space-y-4">
                <a href="https://www.facebook.com/thanabodee.rugkew" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-brand-yellow transition-colors w-fit">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Im Khum Thi Bang Bua</span>
                </a>
                <a href="mailto:ImKhumThiBangBua@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-brand-yellow transition-colors w-fit">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium">ImKhumThiBangBua@gmail.com</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">ติดตามเราได้ที่</h4>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-brand-yellow transition-colors w-fit">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <Music2 className="w-5 h-5" />
                </div>
                <span className="font-medium">อิ่มคุ้มที่บางบัว (TikTok)</span>
              </a>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} อิ่มคุ้ม บางบัว. All rights reserved.
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<'splash' | 'login' | 'main' | 'detail'>('splash');
  
  // State สำหรับจัดการข้อมูลร้านอาหารและโหมดแก้ไข โดยดึงจาก localStorage ถ้ามี
  const [restaurants, setRestaurants] = useState(() => {
    const saved = localStorage.getItem('restaurantsData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved restaurants data");
      }
    }
    return INITIAL_RESTAURANTS;
  });
  
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof INITIAL_RESTAURANTS[0] | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<typeof INITIAL_RESTAURANTS[0] | null>(null);

  const handleSelectRestaurant = (restaurant: typeof INITIAL_RESTAURANTS[0]) => {
    setSelectedRestaurant(restaurant);
    setView('detail');
  };

  const handleBackToMain = () => {
    setView('main');
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
    }, 100);
  };

  const handleSaveEdit = (updatedRestaurant: any) => {
    setRestaurants((prev: any[]) => {
      const newRestaurants = prev.map(r => r.id === updatedRestaurant.id ? updatedRestaurant : r);
      // บันทึกลง localStorage
      localStorage.setItem('restaurantsData', JSON.stringify(newRestaurants));
      return newRestaurants;
    });
    setEditingRestaurant(null); // ปิด Modal
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {view === 'splash' && <SplashScreen key="splash" onFinish={() => setView('login')} />}
        {view === 'login' && <LoginScreen key="login" onLogin={() => setView('main')} />}
        {view === 'main' && (
          <MainPage 
            key="main" 
            restaurants={restaurants}
            onSelectRestaurant={handleSelectRestaurant} 
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
            onEditRestaurant={setEditingRestaurant}
          />
        )}
        {view === 'detail' && selectedRestaurant && (
          <RestaurantDetail 
            key="detail" 
            restaurant={selectedRestaurant} 
            onBack={handleBackToMain} 
          />
        )}
      </AnimatePresence>

      {/* Modal แก้ไขร้านอาหาร จะแสดงเมื่อมีการกดปุ่มแก้ไข */}
      <AnimatePresence>
        {editingRestaurant && (
          <EditRestaurantModal 
            restaurant={editingRestaurant} 
            onSave={handleSaveEdit} 
            onClose={() => setEditingRestaurant(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
