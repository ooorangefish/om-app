import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


const likedSong = [{ name: "爱是昂贵的", singer: "声音玩具", album: "劳动之余", time: '08:06' }, { name: "秋分", singer: "蛙池", album: "郊游", time: '04:05' }, { name: "爱是昂贵的", singer: "声音玩具", album: "劳动之余", time: '3:05' }]

const Mymusic = () => {
    return <div className="bg-gray-80">
        <div className="flex ml-[160px] pt-[10px]">
            <div className="w-[240px] h-[240px]">
                <img src='/images/鲜花.jpeg' className='w-full ' />
            </div>
            <div className="flex flex-col ml-[30px] mt-[12px]">
                <div className="text-3xl font-base">我想念</div>
                <div className=" mt-[20px] flex felx-row">
                    <img src='/images/麦克风.png' className='mx-4 w-5'/>
                    汪苏泷 </div>

                <div className="  mt-[10px]">
                    <div className="mt-[8px]">专辑：我想念  语种：国语 </div>
                    <div className="mt-[5px]">发行时间：2021-7-30</div>
                    <div className="mt-[5px]"></div>
                    <div className="mt-3">
                    <Button className="bg-orange-400 mr-[14px]">
                        播放
                    </Button>
                        <Button variant="secondary">
                            收藏
                        </Button>
                    </div>
                </div>

            </div>
        </div>
        <div className="mt-[10px] ml-[160px]">
            <div className=" text-xl">歌词</div>
            {/* 等数据库有数据再处理歌词格式 */}
            <div >
                我想念 - 汪苏泷

                词：汪苏泷

                曲：汪苏泷

                樱花覆盖地面

                放映黑白默片

                我终于懂了别人口中说的那种思念

                凌晨过12点

                熄灯的便利店

                你的外套还留在我家的客厅里面

                我想念那个不下雪的冬天

                我想念你躲在我围巾里面

                我想念我们取暖的咖啡店

                想念你一切

                我想念那个不太热的夏天

                我想念两人牵着手的大街

                我想念你说过的那种永远

                离我有多远

                无人的斑马线

                夜空繁星点点

                你说看到流星就要懂得许下心愿

                如果愿望能实现

                再看你任性一遍

                亲爱的你是唯一让我如此难以入眠

                我想念那个不下雪的冬天

                我想念你躲在我围巾里面

                我想念我们取暖的咖啡店

                想念你一切

                我想念那个不太热的夏天

                我想念两人牵着手的大街

                我想念你说过的那种永远

                离我有多远

                有多少惦念

                尽量把话说的简短些

                记忆如秋千反复在脑海盘旋

                我想念那个不下雪的冬天

                我想念你躲在我围巾里面

                我想念我们取暖的咖啡店

                想念你一切

                我想念那个不太热的夏天

                我想念两人牵着手的大街

                我想念你说过的那种永远

                离我有多
            </div>
        </div>


    </div>
}

export default Mymusic