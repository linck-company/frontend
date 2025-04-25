import { performGetEventDetails } from "../../../api/hecate";
import { performLogout } from "../../../api/auth";
import { ERROR_STATUS_CODE } from "../../../api/api";

export const fetchEventDetails = async (navigate, setEventDetails, setCategories) => {
    try {
        console.log("Fetching event details...");
        const response = await performGetEventDetails();
        console.log("API Response:", response); // Log the full API response
        if (response.status_code === ERROR_STATUS_CODE) {
          await performLogout();
          navigate("/", { replace: true });
          return;
        }
        if (response.data.events) {
          const events = response.data.events.map((event) => {
            const mappedEvent = {
              category: event.club_organization,
              date: new Date(event.event_date)
                .toLocaleDateString("en-US", { month: "short", day: "numeric" })
                .toUpperCase(),
              title: event.event_title,
              venue: event.event_location,
              time: `${new Date(event.event_start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} - ${new Date(event.event_end_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`,
              id: event.id,
              event_nature: event.event_nature,
              event_host: event.event_host,
              event_description: event.event_description,
              event_organizer_contact_info: event.event_organizer_contact_info,
              event_subject_area: event.event_subject_area,
              event_resource_person: event.event_resource_person,
              event_affiliation: event.event_affiliation,
              event_resource_person_profile: event.event_resource_person_profile,
              event_objective: event.event_objective,
              event_flyer_image_url: event.event_flyer_image_url,
              is_user_registered: event.is_user_registered,
              club_name: event.club_name,
              club_logo_image_url: event.club_logo_image_url,
              club_id: event.club_id,
              registered_count: event.registered_count,
            };
            return mappedEvent;
          });

          // Compute categories from events
          const uniqueCategories = [...new Set(events.map((event) => event.category))];
          const categories = uniqueCategories.map((category) => ({
            name: category,
            image: `images/frame1.png`, // Dynamic images
          }));

          // Log the processed events and categories
          console.log("Processed Events:", events);
          console.log("Categories:", categories);

          // Update state
          setEventDetails(events);
          setCategories(categories);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };













// export const events = [
//     {
//         category: "Self Development",
//         date: "NOV 22",
//         title: "Event title that can go up to two lines",
//         venue: "Venue",
//         time: "00:00 AM - 00:00 PM",
//         interested: 0,

//         "id": 1,
//             "event_title": "FAST WEDNESDAYS",
//             "event_nature": "Competition",
//             "event_date": "2024-03-12T00:00:00Z",
//             "event_start_time": "2000-01-01T16:00:00Z",
//             "event_end_time": "2000-01-01T18:00:00Z",
//             "event_host": "Cubing Club",
//             "event_description": null,
//             "event_location": "S310",
//             "event_organizer_contact_info": "Cubing Club",
//             "event_subject_area": "Cubing",
//             "event_resource_person": "NA",
//             "event_affiliation": "Cubing Club",
//             "event_resource_person_profile": "NA",
//             "event_objective": "The Objective of the event is to teach new solving techniques and allow members to practice different cube puzzles (3x3, Pyraminx, mirror cube etc.). Organize friendly competitions, time trials, or team-solving challenges to make it fun and engaging.",
//             "event_flyer_image_url": "https://drive.usercontent.google.com/download?id=1J8BesUsIu6c3npyXsqtnM1WlocpvB15H&authuser=0",
//             "is_user_registered": true,
//             "club_name": "Cubing Club",
//             "club_logo_image_url": "https://drive.usercontent.google.com/download?id=1J8BesUsIu6c3npyXsqtnM1WlocpvB15H&authuser=0",
//             "club_id": "cubing_club",
            
//             "club_organization": "SELF DEVELOPMENT"
//     },
//     {
//         category: "Cultural Arts",
//         date: "NOV 22",
//         title: "Event title that can go up to two lines",
//         venue: "Venue",
//         time: "00:00 AM - 00:00 PM",
//         interested: 10,
//     },
//     {
//         category: "Sports & Fitness",
//         date: "NOV 25",
//         title: "Marathon Training Session",
//         venue: "City Park",
//         time: "06:00 AM - 08:00 AM",
//         interested: 15,
//     },
//     {
//         category: "Technology",
//         date: "NOV 26",
//         title: "AI and Machine Learning Workshop",
//         venue: "Tech Hub",
//         time: "10:00 AM - 02:00 PM",
//         interested: 25,
//     },
//     {
//         category: "Cultural Arts",
//         date: "NOV 27",
//         title: "Local Art Exhibition",
//         venue: "Art Gallery",
//         time: "11:00 AM - 05:00 PM",
//         interested: 8,
//     },
//     {
//         category: "Self Development",
//         date: "NOV 28",
//         title: "Mindfulness and Meditation Class",
//         venue: "Community Center",
//         time: "07:00 PM - 08:30 PM",
//         interested: 12,
//     },
//     {
//         category: "Department",
//         date: "NOV 29",
//         title: "Team Building Workshop",
//         venue: "Office HQ",
//         time: "09:00 AM - 12:00 PM",
//         interested: 20,
//     },
// ];