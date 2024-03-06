import { m } from 'framer-motion';
import moment from 'moment';

interface myMessageProps {
    text: string;
    timestamp: number;
    user: {
        id: string;
        name: string;
        profileImage: string;
    };
}

interface profileTimeProps {
    index: number;
    items: {
        user: {
            id: string;
            name: string;
            profileImage: string;
        };
    };
    messages: myMessageProps[];
    timeValue: string;
}
export function showProfileTime({ index, items, messages, timeValue }: profileTimeProps): {
    displayTime: boolean;
    displayProfile: boolean;
} {
    let displayTime = true;
    let displayProfile = true;
    if (index !== messages.length - 1) {
        // 현재 메시지와 그 다음 메시지를 동일한 사람이 보내는 지 확인
        const isSamePerson = items.user.id === messages[index + 1].user.id;

        // 현재 메시지와 그 다음 메시지를 동일한 사람이 보낼 경우
        if (isSamePerson) {
            const nextTimeValue = moment(messages[index + 1].timestamp).format('HH:mm');
            if (nextTimeValue == timeValue) {
                displayTime = false;
            }
        }
    }

    if (index !== 0 && index !== messages.length - 1) {
        // 현재 메시지와 직전 메시지를 동일한 사람이 보내는 지 확인
        const isSamePersonProfile = items.user.id === messages[index - 1].user.id;
        const prevTimeValue = moment(messages[index - 1].timestamp).format('HH:mm');

        // 현재 메시지와 직전 메시지가 동일한 사람일 경우 프로필 이미지를 안 보여줌
        if (isSamePersonProfile && prevTimeValue == timeValue) {
            displayProfile = false;
        }
        // 현재 메시지와 그 다음 메시지 보낸 시간이 다를 경우 프로필 사진을 보여줌
        if (isSamePersonProfile && prevTimeValue !== timeValue) {
            displayProfile = true;
        }
    }
    if (index == messages.length - 1) {
        const isSamePersonProfile = items.user.id === messages[index - 1].user.id;
        const prevTimeValue = moment(messages[index - 1].timestamp).format('HH:mm');
        if (isSamePersonProfile && prevTimeValue == timeValue) {
            displayProfile = false;
        }
    }
    return { displayTime, displayProfile };
}
