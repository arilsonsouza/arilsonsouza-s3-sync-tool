import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Buckets } from './pages/Buckets';

export function Router() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Buckets />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
