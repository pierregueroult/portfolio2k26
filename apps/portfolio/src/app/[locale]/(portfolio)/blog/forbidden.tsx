import { ErrorPage } from '@/features/error/components/error-page';

export default function Forbidden() {
    return (
        <ErrorPage
            code="403"
            title="Forbidden"
            description="You don't have permission to access this resource."
        />
    );
}