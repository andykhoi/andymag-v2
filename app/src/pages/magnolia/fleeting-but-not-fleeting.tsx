import { Editor } from '@/editor/components/Editor'
import { FC, useEffect } from 'react'
// import { useClerk } from '@clerk/nextjs'
import { useActivity, useUserFormatting } from '@/contexts/UserContext'
// import { initializeApollo } from '@/utils/apollo'
// import { gql } from '@apollo/client'
// import { GetMagnoliaContributorsQuery, GetMagnoliaContributorsDocument } from '@/graphql/queries/getMagnoliaContributors'
import { Contributors } from '@/types/schema'
// import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { PodcastPlayer } from '@/editor/content/podcast/PodcastPlayer'
import { PodcastCover } from '@/editor/content/podcast/PodcastCover'
import { Podcast } from '@/editor/content/podcast/Podcast'
import { Text } from '@/editor/content/Text'
// import Draggable from 'react-draggable'
import { Londrina_Solid } from '@next/font/google'
import { TranscriptPart } from '@/editor/content/podcast/TranscriptPart'

interface WhatIsArtProps {
	contributors: Contributors[]
}

const londrina_solid = Londrina_Solid({ weight: '900', subsets: ['latin'] })

const WhatIsArt: FC<WhatIsArtProps> = ({
	contributors
}) => {
	const { updateActivity, isLoaded } = useActivity()

	const router = useRouter()
	
	// potensh stick this into _app.js
	useEffect(() => {
		if (isLoaded && updateActivity) {
			updateActivity({ type: 'navigation', tags: [`path:${router.pathname}`, 'article:fleeting-but-not-fleeting'], timestamp: Date.now().toString() })
		}
	}, [updateActivity, isLoaded, router.pathname])

	return (
		<Editor
			people={contributors}
			fontFamilies={{ londrina_solid }}
		>
			<Podcast
				coverSrc={'/covers/dafna.png'}
				coverAlt='Fleeting But Not Fleeting cover photo'
				audioUrl={'/audio/dafna.webm'}
				chapters={[{ time: 0, name: 'Introduction'}, { time: 40, name: 'Who I Am'}, { time: 500, name: 'The Prolouge'}, { time: 700, name: 'Before He Popped the Question'}, { time: 900, name: 'The Relationship'}]}
			>
				<TranscriptPart time={0}>[00:00:00] I&apos;ve always had a pretty unlucky love life. Um, I didn&apos;t have my first kiss until I was about 18, a freshman in college, and it was with a guy who pretty quickly decided he didn&apos;t like me anymore, and this seemed to be a similar theme in my future potential relationships, keyword, potential. To this day, I still haven&apos;t really had any sort of serious relationship and I&apos;m now 21 and a college graduate.</TranscriptPart>
				<TranscriptPart time={24}>[00:00:24] Um, the story you&apos;ll be hearing today is about my first official boyfriend. The circumstances that led to us meeting the rise and fall of our relationship and how it inspired my song, we Jumped the Gun, which is off of my most recent album when I was with you.</TranscriptPart>
				<TranscriptPart time={39}>[00:00:39] Before I delve into the specifics of the song itself and its backstory, I&apos;ll give you a little bit more background about who I am and what led me to this path of writing songs about my failed relationships. </TranscriptPart>
				<TranscriptPart time={66}>[00:01:06] I&apos;m Dafna. I&apos;m a 21 year old from Boulder, Colorado. I just graduated from CU Boulder with a Bachelor&apos;s of Science in Electrical and Computer Engineering. Um, I live in my parents&apos; basement. Hopefully I&apos;ll be moving outta there soon. But I write, record and produce all of my music on my own in said basement. </TranscriptPart>
				<TranscriptPart time={85}>[00:01:25] Um, so far I&apos;ve released two albums, three eps, a handful of singles, which makes that I think 45 songs total.</TranscriptPart>
				<TranscriptPart time={93}>[00:01:33] To get into the actual. Story. Um, I&apos;ve always wanted like a slow burn type romance. A, will they, won&apos;t they type story where the anticipation, the heart-wrenching journey makes the ending just so much more worth it.</TranscriptPart>
				<TranscriptPart time={110}>[00:01:50] But that&apos;s never been the case. So I think this probably made me a lot more obsessive when it came to crushes. You know, instead of having fleeting feelings about multiple guys, I would find one guy and make him the starring subject of my life for as long as I could.</TranscriptPart>
				<TranscriptPart time={124}>[00:02:04] Um, my freshman year of college for a semester, I was in a lab class for my major, and the first day in that class, a really cute guy, let&apos;s call him Brandon, asked to be my lab partner.</TranscriptPart>
				<TranscriptPart time={136}>[00:02:16] Brandon and I ended up being lab partners for that entire semester and then became pretty close friends. Um, I was immediately pretty interested in him, but I didn&apos;t think he would ever be interested in me.</TranscriptPart>
				<TranscriptPart time={149}>[00:02:29] I went, I think through the whole semester pining after him, but I wasn&apos;t like, fully invested because I didn&apos;t know how much I would be seeing of him when we were no longer lab partners. So it didn&apos;t feel like I had really any chance.</TranscriptPart>
				<TranscriptPart time={162}>[00:02:42] So earlier in that semester though, I had started a band of instrumentalists that I had met through either mutual friends or the internet. We had spent the whole semester preparing for my first ever college gig, which was gonna take place at a local coffee shop.</TranscriptPart>
				<TranscriptPart time={178}>[00:02:58] And then a couple days before the gig, my bassist at the time, um, informed me that he could no longer make it through to a family emergency. So scrambling at the last minute, I had remembered that Brandon mentioned he played the bass, and so I reached out to him, asked if he could play the gig, and if he thought he could learn 15 songs in two days.</TranscriptPart>
				<TranscriptPart time={196}>[00:03:16] He said yes, and he learned all the songs, and he ended up being way better than our previous bassist and also just like messed better with everyone. So we kicked the old bassist out. No offense to him and Brandon became my first band&apos;s official bass.</TranscriptPart>
				<TranscriptPart time={223}>[00:03:43] Now, during the time that he was in the band, I continued to be pretty obsessed with him. I really liked him. I don&apos;t know if he reciprocated those feelings at all. But I thought he did for a bit. I do remember him being pretty flirty, but you know, that&apos;s also just the kind of guy he was. But then he got back together with his long-term girlfriend and I had to go through a year of being in love with someone in a relationship and not really being able to do anything about it.</TranscriptPart>
				<TranscriptPart time={251}>[00:04:11] Then in August of 2019, they broke up, and then in November 2019, no longer being able to hold an in after a semester of playing gigs together and seeing him all the time, I confessed my feelings to him-- and he did not feel the same. And then winter break hit. And in January of 2020, he left the band and then Covid- 19 hit.</TranscriptPart>
				<TranscriptPart time={274}>[00:04:34] And after that, I did not see him probably again for an entire year. And I wasn&apos;t heartbroken about this, but I was definitely sad enough to write an entire album about him. The album titled, I Love You, which I, I didn&apos;t love him, but this was just for dramatic purposes. This is what I called the album. Um, it consisted of eight songs in the first letter of each song.</TranscriptPart>
				<TranscriptPart time={296}>[00:04:56] The first letter of each song, title spelled out the name of the album. I Love You, and I released it in September, 2020. It was also pretty obvious that the album was about him. I mean, the first song, which is titled It&apos;s You, not Me, was one I had written before he left the band. So he&apos;d heard it actually, and he asked me like explicitly if it was about him.</TranscriptPart>
				<TranscriptPart time={324}>[00:05:24] And I am a terrible, terrible liar, so I had to tell them the truth and that it was, and then the last song on the album ends with a voicemail that he had left me.</TranscriptPart>
				<TranscriptPart time={353}>[00:05:53] So I really wasn&apos;t trying to hide it. Now, flash forward to January 2021. I had not really thought about this boy in quite a while. You know, after releasing the album, I was feeling pretty moved on. I also had a few flings that previous year that definitely kept my mind off of him.</TranscriptPart>
				<TranscriptPart time={378}>[00:06:18] But then outta the blue, Brandon texts me that he misses me and he wants to catch up over a coffee. I didn&apos;t really know how to feel about this, but you know, we were friends before, so I didn&apos;t really see the harm in meeting up. And so we did. We met up for coffee at the same coffee shop where we had our first gig.</TranscriptPart>
				<TranscriptPart time={399}>[00:06:39] And seeing him, I knew immediately that I still had the same feelings for him. I was also just reading into every single one of his body movements, his body language, trying to pick it up or trying to pick up if there was a chance that he was into me. But then halfway into our coffee, he tells me he has a girlfriend.</TranscriptPart>
				<TranscriptPart time={419}>[00:06:59] So again, all romantic possibility was out the window. And for the rest of the semester we kept hanging out. But this time things were different. You know, I was no longer pining after him. I was sick of the mind games and reading into every touch and every stare. So it was mainly him who was reaching out and initiating.</TranscriptPart>
				<TranscriptPart time={445}>[00:07:25] And at some point in that semester, him and his girlfriend had broken up. She broke up with him. Uh, Anyways, we were hanging out a lot more frequently, but again, I wasn&apos;t getting my hopes up and didn&apos;t see what we were doing as anything more than friendly. Um, even when he would hold my hands across the table, like we&apos;d be sitting at a coffee table, he would just reach, grab and hold my hands for a bit, and then I would be like, no, this is just what friends do.</TranscriptPart>
				<TranscriptPart time={475}>[00:07:55] Or he would like cross path, like, go behind me, linger his hand on my lower back. And I&apos;d be like, ah, just a friend thing to do. That&apos;s what friends do. Um, and then May of 2021, 2 days after my final exams, he came over to my house to watch a movie. Um, I do live with my parents, but my parents were out of town, anyways.</TranscriptPart>
				<TranscriptPart time={497}>[00:08:17] Um, we were watching Scarface, super romantic, I know. And he slowly starts inching towards me on the couch. And first our arms are touching and I&apos;m still like, You know, friends touch arms, this happens. And then his arm was around me and I was like starting to get a little bit like, okay, maybe, but you know, friends can still have arms around each other.</TranscriptPart>
				<TranscriptPart time={520}>[00:08:40] And then like our legs were touching. And then it wasn&apos;t until he finally kissed me that I was like, okay, this isn&apos;t, this isn&apos;t a friends thing anymore. Friends don&apos;t really do this. And so we ended up making out that night and, you know, maybe for a couple hours and then I drove him home. Um, And he was also flying back home the next day since the semester was over, but he was coming back into town in like two weeks to play a gig with his new band.</TranscriptPart>
				<TranscriptPart time={548}>[00:09:08] So I was, I was pretty excited, you know, I was mostly so excited that all of my pining after him wasn&apos;t for nothing and that I wasn&apos;t crazy for thinking that he could be into me. I mean, like I had spent, I think three years just being obsessed with this guy. But I also told myself that I could have cared less if this was the only time it happened.</TranscriptPart>
				<TranscriptPart time={572}>[00:09:32] You know, like that was enough for me and I saw enough red flags from this boy that I knew I could never pursue a serious relationship with him. But also at the same time, like the romantic in me was like, I don&apos;t know, like maybe, maybe I&apos;ve changed him. You know, maybe I&apos;m the one who could tame this boy.</TranscriptPart>
				<TranscriptPart time={591}>[00:09:51] So those next two weeks, I waited and waited. Trying to imagine, you know, what it would be like when we first saw each other again. Would we kiss again? Would he finally confess his feelings for me? Would he get down on one knee and propose? Just kidding. But those two weeks pass, the day of the gig arrives and I was so nervous and heavily anticipating what it would be like.</TranscriptPart>
				<TranscriptPart time={615}>[00:10:15] So I forced my best friend to come along with me to his gig. It was like a house party type gig, very casual. Um, and we arrive, he gives me a hug, introduces himself to my best friend, and then ignores me for the rest of the party.</TranscriptPart>
				<TranscriptPart time={629}>[00:10:29] Yep. Talks to a ton of other girls the whole time. Barely makes any sort of eye contact with me, except for once during his set, he jokingly played like a riff from one of my songs on the bass and he was like, oh, that&apos;s your song, huh?</TranscriptPart>
				<TranscriptPart time={643}>[00:10:43] Yeah. Um, it was during this party though, when I was doing all I could to catch Brandon&apos;s attention that I met my first boyfriend.</TranscriptPart>
				<TranscriptPart time={651}>[00:10:51] His name was Jake. Not actually, this is a fake name for the purposes of this story, but his name was Jake. Jake was very sweet and very funny. He came up to me and my friend during the party and immediately struck up a conversation and we ended up talking pretty much the whole time until I kind of forgot about Brandon.</TranscriptPart>
				<TranscriptPart time={690}>[00:11:30] Um, Jake also immediately showed me he was interested. First he asked for my Snapchat, which I, I hate Snapchat, so I gave him my phone number instead. Um, and after that he texted me later that night and asked me out on a date. He was also just very good at setting up dates. And I was never confused or I never felt like he was playing any games.</TranscriptPart>
				<TranscriptPart time={714}>[00:11:54] Um, he also came over one time and helped me put up wallpaper and set up picture frames in my room, which was sick. He also introduced me to all of his friends who were all really nice, and I was just very excited to be spending the summer with Jake. I truly found pretty much nothing wrong with him.</TranscriptPart>
				<TranscriptPart time={731}>[00:12:11] And then on June 6th, which was our seventh date, we were sitting in my room and he brought up the fact that we&apos;d gone on a lot of dates, had been hanging out a lot. So would I, do I want to be his girlfriend? And I had never gotten this question before, so it was kind of like, a shock to me. And it also felt kind of soon, even though it made sense in the context of how things were going, but I agreed because I didn&apos;t want to be dating anyone else.</TranscriptPart>
				<TranscriptPart time={761}>[00:12:41] Um, and at that moment I felt all my emotional walls get knocked down because finally here was a boy who wanted to be with me. You know, I&apos;d done it. I wasn&apos;t broken. So after Jake went home, in my haze of excitement, I texted all my close friends, called my mom. I even posted a short little TikTok telling everyone the good news.</TranscriptPart>
				<TranscriptPart time={785}>[00:13:05] I&apos;d finally done it. I got a boyfriend.</TranscriptPart>
				<TranscriptPart time={791}>[00:13:11] On the second day of our relationship, we got dinner with some of his friends at my favorite Vietnamese restaurant, and I had some leftover pad Thai and, okay, don&apos;t come at me. It was a Vietnamese restaurant, but they had pad Thai on the menu. Okay. Anyways, I brought that pad Thai home with me, um, and the next day I didn&apos;t really hear much from him.</TranscriptPart>
				<TranscriptPart time={813}>[00:13:33] And we had been texting pretty consistently, all like the previous days that month, but he wasn&apos;t being too responsive that day. But also, I didn&apos;t really think too much of it. You know, we both had jobs, we&apos;re busy people, so I didn&apos;t let it let it get to me. Also, at this point, he was my boyfriend, so I was like, I&apos;ve done the hard part.</TranscriptPart>
				<TranscriptPart time={831}>[00:13:51] I don&apos;t have to be worried about anything. We&apos;re good now. We&apos;re together forever then. On day four of our relationship, Jake comes over. I noticed something was a little bit off of him, but I didn&apos;t say anything. You know, things were still new and we hadn&apos;t really done the whole, let&apos;s talk about our intimate feelings thing, you know, like things were new.</TranscriptPart>
				<TranscriptPart time={852}>[00:14:12] So I still had that leftover pad tie, so he ate that while I baked my banana bread and I put the banana bread in the oven. And then I turned to him and he had this sad look in his eyes and he goes, I think we should talk. Ah, fuck. You know, my stomach dropped and all my walls just immediately came back up.</TranscriptPart>
				<TranscriptPart time={876}>[00:14:36] I felt myself just immediately be on the defensive. So yes, of course this talk ended up with us breaking up. Um, I won&apos;t go too much into his reasons why, but he pretty much ended up giving me a whole, it&apos;s me, not you, speech, you know, telling me how he was struggling mentally and didn&apos;t think he was in the right head space to be in a relationship.</TranscriptPart>
				<TranscriptPart time={896}>[00:14:56] And I respected all that, but I just really wished he would&apos;ve figured that out before asking me to be his girlfriend. You know, just like five days earlier, four days earlier. Either way, after that, he left. I was still in disbelief, you know, I&apos;d finally gotten a boyfriend. And of course my first ever boyfriend breaks up with me after four days.</TranscriptPart>
				<TranscriptPart time={917}>[00:15:17] It was almost so comical. I couldn&apos;t, I couldn&apos;t believe it was real. So I cried for maybe about 10 minutes, you know? Uh, what do they say about, you like, cry for half the time of the relationship, something like that. I cried for 10 minutes. FaceTimed my sister, deleted the TikTok, and then, then I went downstairs and wrote and recorded the majority of We Jumped the Gun.</TranscriptPart>
				<TranscriptPart time={938}>[00:15:38] I structured the song in a way that I felt would represent our very short-lived relationship. The beginning is a love song, a ballad about how I finally found someone to be my boyfriend.</TranscriptPart>
				<TranscriptPart time={978}>[00:16:18] And then this was quickly cut off with an angry pop punk guitar riff that brings us into the next phase of the song where I sing about how, yeah, it sucks, but also we weren&apos;t together that long and it didn&apos;t really hurt me much.</TranscriptPart>
				<TranscriptPart time={1004}>[00:16:44] Also, like looking back at the journal where I wrote this song, um, I had like scribbled a few lyrics, like during this relationship that previous month of like, you know, lovey dovey song lyrics that are found in the beginning of the song. Then I turned the page, I just wrote like sike, like super big. I was like, fuck this guy sike and then wrote the rest of the song.</TranscriptPart>
				<TranscriptPart time={1024}>[00:17:04] But I am mostly on good terms with this guy, you know, I haven&apos;t seen him since. But when I was doing my whole marketing campaign, um, and kind of trashing on him on the internet, I reached out to let him know that there were no hard feelings and that I was just using this story as marketing material. And he was super cool with it, thought it was funny, honestly, good guy, just unfortunate situation.</TranscriptPart>
				<TranscriptPart time={1046}>[00:17:26] And that&apos;s the story of my first boyfriend and our very quick four day relationship. And so far my only relationship that I&apos;ve ever had. But maybe one day I&apos;ll find someone. Or not. Either way, it&apos;s songwriting material.</TranscriptPart>
			</Podcast>
		</Editor>
	)
}

// this is blocking...fonts from being loaded when a url query param is added -- this isn't a problem when building for production - think there's a weird dev env bug in next. 
// export const getStaticProps: GetStaticProps = async () => {
// 	const apollo = initializeApollo()

// 	const { data } = await apollo.query<GetMagnoliaContributorsQuery>({
// 		query: GetMagnoliaContributorsDocument
// 	})

// 	return {
// 		props: {
// 			contributors: data.contributors
// 		}
// 	}
// }

export default WhatIsArt