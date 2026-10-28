import { BookOpen, FileText, ShieldCheck, Users } from 'lucide-react'

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'how-it-works', label: 'How it works', href: '#how-it-works' },
  { id: 'official-resources', label: 'Resources', href: '#official-resources' },
  // Placeholder: no dedicated About page exists yet.
  { id: 'about', label: 'About', href: '#why-raksham' },
]

export const trustIndicators = [
  { icon: ShieldCheck, label: 'Free to use' },
  { icon: FileText, label: 'Verified resources' },
  { icon: Users, label: 'Information, not legal advice' },
]

export const guidanceCards = [
  { id: 'rights', label: 'Understand your rights', icon: 'document' },
  { id: 'guidance', label: 'Get clear guidance', icon: 'compass' },
  { id: 'resources', label: 'Find trusted resources', icon: 'people' },
]

export const features = [
  {
    icon: BookOpen,
    lead: '5+',
    title: 'Legal categories',
    description: 'Covering everyday legal issues in India',
  },
  {
    icon: FileText,
    lead: 'Step-by-step',
    title: 'Guidance',
    description: 'Easy to understand in simple language',
  },
  {
    icon: ShieldCheck,
    lead: 'Verified',
    title: 'Resource directory',
    description: 'Helplines, legal aid centers and trusted organizations',
  },
  {
    icon: Users,
    lead: 'Accessible',
    title: 'Across India',
    description: 'Information available in multiple Indian languages',
  },
]

export const steps = [
  { number: '01', title: 'Choose your issue', description: 'Pick the category that matches your situation.' },
  { number: '02', title: 'Answer a few questions', description: "Simple questions help us understand what you're facing." },
  { number: '03', title: 'Get step-by-step guidance', description: 'See your rights and what to do next, in plain language.' },
  { number: '04', title: 'Reach the right support', description: 'Find verified helplines, legal aid centers, and trusted organizations.', emphasis: true },
]

export const humanHelpPoints = ['Verified credentials', 'Fees shown upfront', 'Your choice, no pressure']
