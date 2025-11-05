-- Create symptom_logs table for daily symptom tracking
CREATE TABLE public.symptom_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  mood TEXT,
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 5),
  cramps BOOLEAN DEFAULT false,
  bloating BOOLEAN DEFAULT false,
  headache BOOLEAN DEFAULT false,
  breast_tenderness BOOLEAN DEFAULT false,
  acne BOOLEAN DEFAULT false,
  spotting BOOLEAN DEFAULT false,
  heavy_flow BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.symptom_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for symptom_logs
CREATE POLICY "Users can view their own symptom logs"
  ON public.symptom_logs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own symptom logs"
  ON public.symptom_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own symptom logs"
  ON public.symptom_logs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add trigger for symptom_logs updated_at
CREATE TRIGGER update_symptom_logs_updated_at
  BEFORE UPDATE ON public.symptom_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();