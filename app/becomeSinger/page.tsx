import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const becomeSinger = () => {
  return (
    <div className="mt-[110px]">
      <div className="flex flex-row flex-wrap my-12 justify-center w-full text-5xl ">
        <img src="/images/orange.png" className="h-12 mr-[10px]" />
        <div className=" md:font-bold">橘子音乐开放平台</div>
        <div className="w-full flex justify-center text-3xl my-5">
          欢迎您的加入！
        </div>
      </div>
      <div className="flex justify-center my-5 flex-wrap ">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">上传作品成为音乐人</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>成为音乐人</DialogTitle>
              <DialogDescription>
                闪耀从这里开始，申请成为音乐人，开始你的音乐之旅吧
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">确认上传</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default becomeSinger;
