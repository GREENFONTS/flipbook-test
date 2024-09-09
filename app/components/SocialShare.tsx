import React from "react";

interface SocialShareProps {
  url: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url }) => {
  const shareToSocial = (platform: string) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
        break;
    }
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="social-share" style={{ display: 'flex', gap: '10px' }}>
      <SocialIcon platform="facebook" color="#3b5998" icon="fab fa-facebook-f" onClick={() => shareToSocial("facebook")} />
      <SocialIcon platform="twitter" color="#1da1f2" icon="fab fa-twitter" onClick={() => shareToSocial("twitter")} />
      <SocialIcon platform="linkedin" color="#0077b5" icon="fab fa-linkedin-in" onClick={() => shareToSocial("linkedin")} />
      <SocialIcon platform="pinterest" color="#bd081c" icon="fab fa-pinterest-p" onClick={() => shareToSocial("pinterest")} />
      <SocialIcon platform="whatsapp" color="#25d366" icon="fab fa-whatsapp" onClick={() => shareToSocial("whatsapp")} />
    </div>
  );
};

interface SocialIconProps {
  platform: string;
  color: string;
  icon: string;
  onClick: () => void;
}

const SocialIcon: React.FC<SocialIconProps> = ({ color, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '4px',
        borderRadius: '50%',
        backgroundColor: color,
        color: 'white',
        transition: 'transform 0.2s',
        width: '28px',
        height: '28px',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <i className={icon} aria-hidden="true"></i>
    </div>
  );
};

export default SocialShare;