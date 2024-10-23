'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IWorkshop } from '@/app/interfaces/IWorkshop';
import { updateWorkshop } from '../../../../lib/data';
import { toast } from 'react-hot-toast';

export default function Visibility({
  state,
  setState,
}: {
  state: IWorkshop;
  setState: (newState: any) => void;
}) {
  const visibilityHandler = async (value: boolean) => {
    await updateWorkshop({ ...state, visibility: value }).then(() => {
      setState((prev: any) => ({ ...prev, visibility: value }));
      toast.success('Visibility updated');
    });
  };
  return (
    <div className="flex items-center justify-between">
      <Tabs
        value={state.visibility ? 'true' : 'false'}
        onValueChange={(val) => visibilityHandler(val === 'true')}
      >
        <TabsList className="flex items-center space-x-4">
          <TabsTrigger name="visibility" value="true">
            Public
          </TabsTrigger>
          <TabsTrigger name="visibility" value="false">
            Private
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}