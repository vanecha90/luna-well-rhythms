-- Create fitness_tracking table for daily activity tracking
CREATE TABLE public.fitness_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  steps INTEGER DEFAULT 0,
  calories_burned INTEGER DEFAULT 0,
  avg_heart_rate INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.fitness_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for fitness_tracking
CREATE POLICY "Users can view their own fitness tracking"
  ON public.fitness_tracking
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own fitness tracking"
  ON public.fitness_tracking
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fitness tracking"
  ON public.fitness_tracking
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create workout_logs table for completed workouts
CREATE TABLE public.workout_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  workout_name TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  intensity TEXT NOT NULL,
  calories_burned INTEGER NOT NULL,
  description TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for workout_logs
CREATE POLICY "Users can view their own workout logs"
  ON public.workout_logs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout logs"
  ON public.workout_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add trigger for fitness_tracking updated_at
CREATE TRIGGER update_fitness_tracking_updated_at
  BEFORE UPDATE ON public.fitness_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();