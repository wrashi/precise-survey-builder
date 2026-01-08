import { Button } from '@/components/ui/button';
import { BottleneckCategory, generateShareText } from '@/lib/surveyData';
import { Twitter, Linkedin, Mail } from 'lucide-react';

interface ShareButtonsProps {
  primaryCategory: BottleneckCategory;
}

export function ShareButtons({ primaryCategory }: ShareButtonsProps) {
  const handleTwitterShare = () => {
    const text = encodeURIComponent(generateShareText(primaryCategory, 'twitter'));
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };
  
  const handleLinkedInShare = () => {
    const text = encodeURIComponent(generateShareText(primaryCategory, 'linkedin'));
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };
  
  const handleEmailShare = () => {
    const subject = encodeURIComponent(generateShareText(primaryCategory, 'email'));
    const body = encodeURIComponent(`Check out my Bottleneck Audit results! Take yours at: ${window.location.origin}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={handleTwitterShare} className="gap-2">
        <Twitter className="h-4 w-4" />
        Share on X
      </Button>
      <Button variant="outline" onClick={handleLinkedInShare} className="gap-2">
        <Linkedin className="h-4 w-4" />
        Share on LinkedIn
      </Button>
      <Button variant="outline" onClick={handleEmailShare} className="gap-2">
        <Mail className="h-4 w-4" />
        Share via Email
      </Button>
    </div>
  );
}
