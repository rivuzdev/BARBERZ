import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-primary" />
            <h1 className="headline text-2xl text-secondary">404 - BARBERZ</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            No encontramos esta página. Volvé al inicio o revisá la ruta.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
