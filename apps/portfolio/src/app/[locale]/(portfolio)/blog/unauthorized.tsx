import { ErrorPage } from '@/features/error/components/error-page';

export default function Unauthorized() {
    return (
        <ErrorPage
            code="401"
            title="Unauthorized"
            description="You are not authorized to view this page."
        />
    );
}