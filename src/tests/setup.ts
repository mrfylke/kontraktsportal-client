import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

vi.stubEnv('KONTRAKTSPORTAL_API_URL', 'https://api.kontraktsportal.no');
