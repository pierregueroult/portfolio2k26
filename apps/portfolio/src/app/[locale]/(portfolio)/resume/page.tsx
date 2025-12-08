import { Metadata } from 'next';
import { getTranslations, getMessages } from 'next-intl/server';
import { generateAlternates } from '@/features/search-engines/lib/generate-alternates';
import { assertValidLocaleFromParams } from '@/features/internationalization/lib/utils';
import { ResumeSection } from '@/features/resume/components/resume-section';
import { TimelineItem } from '@/features/resume/components/timeline-item';
import { CertificationItem as CertificationItemComponent } from '@/features/resume/components/certification-item';
import { messagesObjectToArray, mapTimelineItems } from '@/features/resume/lib/utils';
import type {
  WorkItem,
  WorkItemMessage,
  SchoolItem,
  SchoolItemMessage,
  CertificationItem as CertificationItemType,
  CertificationItemMessage,
} from '@/features/resume/types';
import { resumeImages, placeholderImage } from '@/features/resume/data/images';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const locale = await assertValidLocaleFromParams(params);
  const t = await getTranslations({ locale: locale.slug, namespace: 'ResumePage' });

  return {
    title: t('title'),
    alternates: generateAlternates('/resume'),
  };
}

export default async function ResumePage({ params }: PageProps<'/[locale]'>) {
  const locale = await assertValidLocaleFromParams(params);
  const t = await getTranslations({ locale: locale.slug, namespace: 'ResumePage' });
  const messages = await getMessages({ locale: locale.slug });

  const resumeMessages = messages.ResumePage;

  const works = messagesObjectToArray<WorkItemMessage>(resumeMessages.works);
  const schools = messagesObjectToArray<SchoolItemMessage>(resumeMessages.schools);
  const volunteering = messagesObjectToArray<WorkItemMessage>(resumeMessages.volunteering);
  const certifications = messagesObjectToArray<CertificationItemMessage>(
    resumeMessages.certifications,
  );

  const worksWithGrouping = mapTimelineItems<WorkItem>(works);
  const schoolsWithGrouping = mapTimelineItems<SchoolItem>(schools);
  const volunteeringWithGrouping = mapTimelineItems<WorkItem>(volunteering);

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4 md:px-6 space-y-16 mb-20">
      <ResumeSection title={t('sections.schools')} variant="timeline">
        {schoolsWithGrouping.map((school) => (
          <TimelineItem
            key={school.id}
            title={school.school}
            subtitle={school.degree}
            date={school.date}
            description={school.description}
            logoUrl={resumeImages[school.id] ?? placeholderImage}
            logoAlt={school.logoAlt}
            isContinuation={school.isContinuation}
            isLastInGroup={school.isLastInGroup}
          />
        ))}
      </ResumeSection>
      <ResumeSection title={t('sections.works')} variant="timeline">
        {worksWithGrouping.map((work) => (
          <TimelineItem
            key={work.id}
            title={work.title}
            subtitle={work.company}
            date={work.date}
            description={work.description}
            logoUrl={resumeImages[work.id] ?? placeholderImage}
            logoAlt={work.logoAlt}
            isContinuation={work.isContinuation}
            isLastInGroup={work.isLastInGroup}
          />
        ))}
      </ResumeSection>

      <ResumeSection title={t('sections.certifications')} variant="list">
        {certifications.map((cert) => (
          <CertificationItemComponent
            key={cert.id}
            title={cert.title}
            issuer={cert.issuer}
            date={cert.date}
            logoUrl={resumeImages[cert.id] ?? placeholderImage}
            logoAlt={cert.logoAlt}
          />
        ))}
      </ResumeSection>
      <ResumeSection title={t('sections.volunteering')} variant="timeline">
        {volunteeringWithGrouping.map((volunteer) => (
          <TimelineItem
            key={volunteer.id}
            title={volunteer.title}
            subtitle={volunteer.company}
            date={volunteer.date}
            description={volunteer.description}
            logoUrl={resumeImages[volunteer.id] ?? placeholderImage}
            logoAlt={volunteer.logoAlt}
            isContinuation={volunteer.isContinuation}
            isLastInGroup={volunteer.isLastInGroup}
          />
        ))}
      </ResumeSection>
    </div>
  );
}
