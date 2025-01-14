'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { createWorkshop } from '../../../lib/data';
import { IWorkshopsPage } from '../../../interfaces/IWorkshopsPage';
import { useToast } from '@/hooks/use-toast';

// need to navigate to edit page [id] and do CRUD operations
export default function Component({ data }: { data: IWorkshopsPage }) {
  const { toast } = useToast();

  const createWorkshopHandler = async () => {
    await createWorkshop().then((res) => {
      if (!res) {
        toast({
          variant: 'destructive',
          title: 'Error creating class',
          description: 'Class could not be created',
        });
      } else if (res.status === 200) {
        toast({
          title: 'Class created',
          description: 'Class created successfully',
        });
      }
    });
  };
  return (
    <div className="flex h-full w-full flex-col">
      <header>
        <h1 className="text-lg font-bold">Classes</h1>
      </header>
      <div className="flex w-full flex-1 flex-wrap gap-6 px-6">
        {data.workshops &&
          data.workshops.map((workshop, index) => (
            <Link href={`/classes/${workshop.id}`}>
              <Card className="h-[350px] w-[250px] overflow-hidden">
                <CardHeader className="p-0">
                  {workshop.imgSrc ? (
                    <Image
                      src={workshop.imgSrc}
                      alt={'Class Image'}
                      width={384}
                      height={200}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center bg-gray-200 text-gray-400">
                      no image
                    </div>
                  )}
                </CardHeader>
                <CardContent className="h-[110px] p-4">
                  <CardTitle className="text-lg">{workshop.heading}</CardTitle>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    {workshop.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    {workshop.location}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        <Button
          className="fixed bottom-10 right-5 h-12 w-12 rounded-full text-lg lg:right-10"
          onClick={() => createWorkshopHandler()}
        >
          +
        </Button>
      </div>
    </div>
  );
}
