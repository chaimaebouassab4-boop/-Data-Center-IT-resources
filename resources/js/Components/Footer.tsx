import { Server, Github, Twitter, Linkedin } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: 'Platform',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Resources', href: '#resources' },
        { label: 'Documentation', href: '#docs' },
        { label: 'API Reference', href: '#api' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Contact', href: '#contact' },
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
      ],
    },
  ];

  const socialLinks: SocialLink[] = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative py-12 border-t border-slate-700/50 bg-slate-900/50">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Server className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                DataCenter<span className="text-blue-400">Hub</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Enterprise-grade resource management for modern data centers.
              Streamline reservations, optimize utilization, and maintain complete control.
            </p>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section, index) => (
            <div key={`footer-section-${index}`}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={`${section.title}-link-${linkIndex}`}>
                    <a
                    
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label={link.label}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} DataCenterHub. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">

            {socialLinks.map((social, index) => {

              const Icon = social.icon;
              return (
                    <a
                
                  key={`social-${index}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}