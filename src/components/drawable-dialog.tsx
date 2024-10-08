import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerDialog({
  title,
  btnTitle,
  description,
  children,
  isOpen,
  setIsOpen,
}: {
  title: string;
  btnTitle: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="" variant="outline">
            {btnTitle}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white ">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DrawerDescription className="text-transparent">
              {description}
            </DrawerDescription>
          </DialogHeader>

          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="" variant="outline">
          {btnTitle}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription className="text-transparent">
            {description}
          </DrawerDescription>
        </DrawerHeader>

        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
