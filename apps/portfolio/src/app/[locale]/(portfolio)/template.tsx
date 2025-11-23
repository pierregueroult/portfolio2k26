import { MotionDiv } from '@repo/ui/components/motion/div';

type PortfolioTemplateProps = LayoutProps<'/[locale]'>;

export default function PortfolioTemplate({ children }: PortfolioTemplateProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
    >
      {children}
    </MotionDiv>
  );
}
