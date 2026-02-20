import { useState, useRef, useEffect } from 'react';
import type { Video } from '@/types';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Download, 
  Volume2, 
  VolumeX, 
  Play,
  Bookmark,
  Music,
  MoreHorizontal
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  isLoggedIn: boolean;
  isLiked: boolean;
  isSaved: boolean;
  onLoginRequired: () => void;
  onLike: () => void;
  onSave: () => void;
  onDownload: () => void;
}

export function VideoCard({ 
  video, 
  isLoggedIn, 
  isLiked,
  isSaved,
  onLoginRequired, 
  onLike,
  onSave,
  onDownload 
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    onLike();
  };

  const handleSave = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    onSave();
  };

  const handleDownload = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    onDownload();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-md mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl"
      style={{ aspectRatio: '9/16', maxHeight: 'calc(100vh - 200px)' }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={video.url}
        poster={video.thumbnail}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center animate-pulse">
            <Play className="w-10 h-10 text-white ml-1" />
          </div>
        </div>
      )}

      <div className={`absolute top-4 left-4 right-4 flex justify-between items-start transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-all"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem>الإبلاغ عن محتوى</DropdownMenuItem>
            <DropdownMenuItem>عدم الاهتمام</DropdownMenuItem>
            <DropdownMenuItem>نسخ الرابط</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="flex items-start gap-3 mb-4">
          <img 
            src={video.authorAvatar} 
            alt={video.authorName}
            className="w-12 h-12 rounded-full border-2 border-white/50"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg">@{video.authorName}</h3>
            <p className="text-sm text-white/90 line-clamp-2 mt-1 leading-relaxed">{video.description}</p>
            
            <div className="flex items-center gap-2 mt-2 text-sm text-white/80">
              <Music className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="truncate">موسيقى أصلية - {video.authorName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-4 bottom-20 flex flex-col gap-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLike}
                className="flex flex-col items-center gap-1 group"
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                  isLiked 
                    ? 'bg-gradient-to-br from-pink-500 to-rose-500 shadow-pink-500/40' 
                    : 'bg-gray-800/80 hover:bg-gray-700 backdrop-blur-sm'
                )}>
                  <Heart className={cn(
                    "w-6 h-6 transition-transform group-hover:scale-110",
                    isLiked ? 'fill-white text-white' : 'text-white'
                  )} />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">{formatNumber(video.likes)}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{isLiked ? 'إلغاء الإعجاب' : 'إعجاب'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => !isLoggedIn && onLoginRequired()}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-800/80 hover:bg-gray-700 backdrop-blur-sm flex items-center justify-center transition-all shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">{formatNumber(video.comments)}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>تعليقات</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleSave}
                className="flex flex-col items-center gap-1 group"
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                  isSaved 
                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500 shadow-yellow-500/40' 
                    : 'bg-gray-800/80 hover:bg-gray-700 backdrop-blur-sm'
                )}>
                  <Bookmark className={cn(
                    "w-6 h-6 transition-transform group-hover:scale-110",
                    isSaved ? 'fill-white text-white' : 'text-white'
                  )} />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">{isSaved ? 'محفوظ' : 'حفظ'}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{isSaved ? 'إزالة من المحفوظات' : 'حفظ الفيديو'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 rounded-full bg-gray-800/80 hover:bg-gray-700 backdrop-blur-sm flex items-center justify-center transition-all shadow-lg">
                  <Share2 className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">{formatNumber(video.shares)}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>مشاركة</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleDownload}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-800/80 hover:bg-gray-700 backdrop-blur-sm flex items-center justify-center transition-all shadow-lg">
                  <Download className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">تنزيل</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{isLoggedIn ? 'تنزيل الفيديو' : 'سجل دخول للتنزيل'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
