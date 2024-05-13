"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { add } from "@/lib/requests";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import AuthContext from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const titles = [
  { name: "发现音乐", link: "/" },
  { name: "我的音乐", link: "/myMusic" },
  { name: "所有歌手", link: "/singers" },
  // { name: "成为音乐人", link: "/becomeSinger" },
];

type FormValue = {
  username: string;
  password: string;
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = React.useState("");
  const registerForm = useForm<FormValue>();
  const loginForm = useForm<FormValue>();
  const { toast } = useToast();
  const [mounted, setMounted] = React.useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = React.useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = React.useState(false);
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const submitLogin = (values: FormValue) => {
    add("/login", values).then((res) => {
      authContext?.setUserInfo(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      setIsLoginDialogOpen(false);
      toast({
        title: res.message,
        variant: res.success ? "default" : "destructive",
        duration: 1000,
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
      });
    });
  };

  const submitRegister = (values: FormValue) => {
    add("/register", values).then((res) => {
      toast({
        title: res.error ? res.error : "注册成功!",
        variant: res.error ? "destructive" : "default",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        duration: 1000,
      });

      if (!res.error) {
        authContext?.setUserInfo(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
        setIsRegisterDialogOpen(false);
      }
    });
  };

  return mounted ? (
    <div className="flex flex-row justify-between items-center shadow py-6 fixed w-full bg-white z-50 px-8">
      <div className="flex flex-row w-90 md:font-bold text-lg items-center gap-x-2">
        <img src="/images/orange.png" className="h-10" />
        橘子音乐
      </div>
      <div className="w-200 flex flex-row justify-between gap-x-8 items-center">
        {titles.map((item, key) => {
          return (
            <div className="relative">
              <a
                key={key}
                className={clsx("hover:text-primary", {
                  "text-primary": pathname === item.link,
                })}
                href={item.link}
              >
                {item.name}
              </a>
              {pathname === item.link && (
                <p className="absolute w-full h-0.5 bg-primary -bottom-1 left-0"></p>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2 ">
        <Input
          placeholder="搜索歌曲/歌手/专辑"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button onClick={() => router.push(`/search?query=${searchInput}`)}>
          搜索
        </Button>
      </div>
      <div className="flex flex-row gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar
              className={clsx({
                hidden: !authContext?.user,
              })}
            >
              <AvatarImage src="/images/头像.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuItem
              onClick={() => {
                authContext?.setUserInfo(null);
                localStorage.removeItem("user");
              }}
            >
              登出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog
          open={isRegisterDialogOpen}
          onOpenChange={() => setIsRegisterDialogOpen(!isRegisterDialogOpen)}
        >
          <DialogTrigger>
            <Button
              onClick={() => setIsRegisterDialogOpen(true)}
              variant="outline"
              className={clsx({
                hidden: authContext?.user,
              })}
            >
              注册
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>注册</DialogTitle>
              <DialogDescription>立即注册享受音乐</DialogDescription>
            </DialogHeader>
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(submitRegister)}
                className="space-y-8"
              >
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>用户名</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="请输入用户名" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="请输入密码" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">注册</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isLoginDialogOpen}
          onOpenChange={() => setIsLoginDialogOpen(!isLoginDialogOpen)}
        >
          <DialogTrigger onClick={() => setIsLoginDialogOpen(true)}>
            <Button
              variant="outline"
              className={clsx({
                hidden: authContext?.user,
              })}
            >
              登录
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>登录</DialogTitle>
              <DialogDescription>立即登录享受音乐</DialogDescription>
            </DialogHeader>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(submitLogin)}
                className="space-y-8"
              >
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>用户名</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="请输入用户名" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="请输入密码" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">登录</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ) : null;
};

export default Header;
