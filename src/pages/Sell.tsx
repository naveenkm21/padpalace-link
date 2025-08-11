import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormValues {
  title: string;
  address: string;
  city: string;
  state: string;
  zip_code?: string;
  price: number | string;
  property_type: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  square_feet?: number | string;
  description?: string;
  images?: string; // comma-separated URLs
}

const Sell = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      state: "",
      property_type: "house",
    }
  });

  // SEO
  useEffect(() => {
    document.title = "Sell Property - EstateHub";
    const desc = "List your home on EstateHub. Fast, secure property submission for agents.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.href;
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [loading, user, navigate]);

  const onSubmit = async (values: FormValues) => {
    if (!user) return;

    const payload = {
      title: values.title,
      address: values.address,
      city: values.city,
      state: values.state,
      zip_code: values.zip_code || null,
      price: Number(values.price),
      property_type: values.property_type,
      bedrooms: values.bedrooms ? Number(values.bedrooms) : null,
      bathrooms: values.bathrooms ? Number(values.bathrooms) : null,
      square_feet: values.square_feet ? Number(values.square_feet) : null,
      description: values.description || null,
      images: values.images
        ? values.images.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      agent_id: user.id,
    } as const;

    const { data, error } = await supabase
      .from("properties")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      toast({ title: "Failed to create listing", description: error.message });
      return;
    }

    toast({ title: "Listing created", description: "Your property has been submitted." });
    if (data?.id) {
      navigate(`/property/${data.id}`);
    } else {
      navigate("/properties");
    }
  };

  return (
    <main className="container py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sell your property</h1>
        <p className="text-muted-foreground mt-2">Create a new listing. You must be signed in.</p>
      </header>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Property details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Charming family home" {...register("title", { required: true })} />
                {errors.title && <p className="text-sm text-destructive">Title is required</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="property_type">Property type</Label>
                <Select onValueChange={(v) => setValue("property_type", v)} defaultValue="house">
                  <SelectTrigger id="property_type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" {...register("address", { required: true })} />
                {errors.address && <p className="text-sm text-destructive">Address is required</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="San Francisco" {...register("city", { required: true })} />
                {errors.city && <p className="text-sm text-destructive">City is required</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="CA" {...register("state", { required: true })} />
                {errors.state && <p className="text-sm text-destructive">State is required</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip_code">ZIP code</Label>
                <Input id="zip_code" placeholder="94105" {...register("zip_code")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input id="price" type="number" min={0} step="1000" placeholder="750000" {...register("price", { required: true })} />
                {errors.price && <p className="text-sm text-destructive">Price is required</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" type="number" min={0} step="1" placeholder="3" {...register("bedrooms")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" type="number" min={0} step="0.5" placeholder="2" {...register("bathrooms")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="square_feet">Square feet</Label>
                <Input id="square_feet" type="number" min={0} step="10" placeholder="1500" {...register("square_feet")} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="images">Image URLs (comma-separated)</Label>
                <Input id="images" placeholder="https://... , https://..." {...register("images")} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the property..." {...register("description")} />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Create listing"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Sell;
