-- 1. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    level TEXT,
    duration TEXT,
    price TEXT,
    status TEXT DEFAULT 'Available',
    tags TEXT, -- Store as comma separated string or you can change to text[]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Allow public read access, but restrict edits to authenticated users
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access to courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users full access to courses" ON public.courses USING (auth.role() = 'authenticated');

-- 2. Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    experience TEXT,
    course TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Allow anyone to insert, but only authenticated users can read/update/delete
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public to insert enrollments" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users full access to enrollments" ON public.enrollments USING (auth.role() = 'authenticated');

-- 3. Hire Requests Table
CREATE TABLE IF NOT EXISTS public.hire_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT,
    budget TEXT,
    details TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Allow anyone to insert, but only authenticated users can read/update/delete
ALTER TABLE public.hire_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public to insert hire requests" ON public.hire_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users full access to hire requests" ON public.hire_requests USING (auth.role() = 'authenticated');

-- 4. Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    readTime TEXT,
    date TEXT,
    published BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Allow public read access, but restrict edits to authenticated users
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access to blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users full access to blogs" ON public.blogs USING (auth.role() = 'authenticated');
