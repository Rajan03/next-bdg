interface SessionUser {
    id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: Date | null;
}

interface LabelValue { label: string, value: number }