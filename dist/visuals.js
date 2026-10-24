/* Topic-specific learning diagrams. SVG stays crisp on phones and larger screens. */
const topicVisuals = {
 'bits-and-bytes':['Eight small switches make one byte',['A bit','0 or 1','Two possible states'],['A byte','8 bits together','01000001'],['A file','Many bytes','Logs, images, packages'],'File sizes count bytes. Network speeds are often measured in bits per second.'],
 'binary':['Same value, different notation',['Place values','8 · 4 · 2 · 1','Each position doubles'],['Binary','1 · 0 · 1 · 0','8 + 0 + 2 + 0'],['Decimal','10','The same quantity'],'Binary 1010 and decimal 10 represent the same number.'],
 'hexadecimal':['Four bits fit into one hex digit',['Binary','1010 | 1111','Group four bits'],['Hexadecimal','A | F','10 becomes A; 15 becomes F'],['Same value','0xAF = 175','Two digits represent a byte'],'Hex is a compact way for people to read binary data.'],
 'ascii-and-unicode':['A character becomes bytes',['Character','A','What you read'],['Code point','U+0041','Unicode assigns a number'],['UTF-8 bytes','41 in hex','65 in decimal'],'UTF-8 uses one to four bytes per Unicode code point; A uses one byte.'],
 'client-and-server':['Two roles in a conversation',['Client','Your browser','Asks for a web page'],['Network','HTTP request','Carries the message'],['Server','Web application','Handles the request'],'A server can also be a client when it calls another service.'],
 'request-and-response':['A round trip, not a one-way message',['Browser → server','GET /products','Request: show products'],['Server handles it','Read product data','Prepare the result'],['Server → browser','200 OK + content','Response: here they are'],'The request asks for something; the response reports the result.'],
 'kernel':['The bridge to your hardware',['Application','Read a file','Asks the operating system'],['Kernel','Coordinates access','CPU, memory, devices'],['Hardware','Disk + CPU + RAM','Does the physical work'],'Applications normally use operating-system interfaces rather than controlling hardware directly.'],
 'processes-vs-threads':['One running app, several workers',['Process','Running application','Own address space'],['Threads','Workers inside it','Share process memory'],['CPU','Executes threads','Schedules their work'],'Separate processes normally have separate memory; threads in one process share memory.'],
 'ram-vs-disk':['Working space and long-term storage',['Disk','Application files','Remain after power off'],['RAM','Currently used data','Usually lost after power off'],['CPU','Works on loaded data','Uses memory while running'],'Restarting clears ordinary RAM contents, but files on disk remain.'],
 'database-vs-disk-vs-cloud-storage':['These are different layers',['Disk','Storage device','Holds persistent bytes'],['Database','Organizes data','Queries, tables, indexes'],['Cloud storage','Remote storage service','Objects, files, or volumes'],'A database itself stores data on storage; cloud storage is not automatically a database.'],
 'cpu-scheduling':['Sharing a limited amount of CPU time',['Ready tasks','App A · App B · App C','Waiting for CPU time'],['Scheduler','Chooses what runs','Based on scheduling policy'],['CPU time','A → B → A → C','Simplified time sharing'],'With multiple cores, several threads can run at once.'],
 'file-system-tree':['Folders form a hierarchy',['Root','/','Top of the Linux tree'],['Directory','/home/aasritha','A folder within the tree'],['File','notes.md','Lives inside a directory'],'The complete path is /home/aasritha/notes.md.'],
 'source-code':['The human-readable instructions',['Developer','Writes instructions','In a programming language'],['Source file','app.py or Program.cs','Text that can be edited'],['Build or runtime','Processes the source','Makes the program usable'],'Source code is the recipe; a running process is the recipe being carried out.'],
 'compiler-vs-interpreter':['Two simplified execution paths',['Compiler path','Source → compiled output','Translate before execution'],['Interpreter path','Source → interpreter','Execute through a runtime'],['Real systems','Often combine both','For example bytecode + JIT'],'Compiler and interpreter are tools; compilation and interpretation are processes.'],
 'compilation':['The compiler performs compilation',['Input','Source code','Written by a developer'],['Compiler','Translate + check','Reports compilation errors'],['Output','Object code or bytecode','Depends on the toolchain'],'Compilation can succeed even when the program still contains a logic bug.'],
 'linking':['Connect the pieces of a program',['Your code','Compiled object files','May reference other functions'],['Linker','Resolve references','Connect code and libraries'],['Program','Linked output','Some libraries load at runtime'],'A missing library can cause a linking error or a runtime loading failure.'],
 'machine-code':['Instructions the processor understands',['Source','Human-readable code','High-level instructions'],['Translation','Compiler or JIT','Produces CPU instructions'],['Machine code','CPU-specific bytes','Executed by the processor'],'Machine code for one CPU architecture may not run on another architecture.'],
 'runtime':['What happens while the app is running',['Start','Launch the application','Load code and configuration'],['Runtime','Execute the work','Use memory and services'],['Result','Response or error','Observed while running'],'A successful build does not prove the application will work in its runtime environment.'],
 'stack-vs-heap':['Two ways runtime memory is organized',['Stack','Function call frames','Often includes local values'],['Heap','Allocated objects','Lifetimes can outlast a call'],['Cleanup','Depends on the language','Garbage collection or manual'],'This is a simplified model. Exact placement depends on the language and runtime.'],
 'process-vs-thread':['A process contains execution threads',['Process','One application instance','Memory and resources'],['Thread A','Handle a request','Shares process memory'],['Thread B','Do other work','Also shares process memory'],'More threads do not guarantee a faster application; CPU and waiting time matter.'],
 'exit-codes':['A command tells automation its result',['Command','Run a build or test','Process finishes'],['Exit code 0','Success convention','Pipeline may continue'],['Nonzero code','Failure convention','Pipeline can stop or handle it'],'The exact meaning of a nonzero code depends on the command.'],
 'dotnet-clr-jit-msil':['The usual .NET JIT execution path',['C# source','Compiler','Produces IL + metadata'],['CLR runtime','JIT compiler','Compiles needed IL to native code'],['CPU','Native machine code','Runs the instructions'],'This shows a common JIT workflow; .NET also supports ahead-of-time compilation.'],
 'managed-vs-unmanaged':['Who manages memory?',['Managed code','Runtime helps','For example garbage collection'],['Unmanaged code','Native memory control','Explicit lifetime management'],['Interop boundary','Calls between them','Needs careful handling'],'Managed code can still leak resources and use too much memory.'],
 'environment-variables-at-runtime':['Configuration supplied when an app starts',['Environment','APP_MODE=staging','Set outside source code'],['Running process','Reads APP_MODE','Uses the supplied value'],['Behaviour','Staging configuration','Same code, different settings'],'Do not put real passwords in examples, screenshots, or committed configuration.'],
 'source-to-running-application':['From an edit to a running service',['Source','Write + commit','The change is recorded'],['Build + package','Create an artifact','Test what will be shipped'],['Deploy + run','Start in an environment','Check health and behaviour'],'The artifact is the packaged output you deploy, not the running process itself.'],
 'dependencies':['Two kinds of things an app relies on',['Code dependency','PDF library','Included or restored for the app'],['Your application','Invoice + checkout','Uses libraries and calls services'],['Service dependency','Payment API','Reached over a network'],'The website can open while checkout fails because its payment service is unavailable.'],
 'package-managers':['Download the libraries your project needs',['Project definition','Names + versions','What your project requests'],['Package manager','NuGet · npm · pip','Downloads and installs packages'],['Package registry','Published packages','Source of package files'],'Use the ecosystem’s lock or resolved dependency records to help reproduce installs.'],
 'semantic-versioning':['Read a version as major.minor.patch',['MAJOR','2 . x . x','Incompatible API changes'],['MINOR','x . 3 . x','Compatible new functionality'],['PATCH','x . x . 1','Compatible bug fixes'],'Under SemVer, 0.x versions are initial development; compatibility promises can differ.'],
 'application-environments':['The journey to real users',['Development','Make changes','Fast feedback'],['Staging','Rehearse the release','Production-like checks'],['Production','Serve real users','Monitor and protect reliability'],'Each environment has its own configuration and data; production deserves special care.'],
 'configuration-per-environment':['Same artifact, different settings',['Build once','Application artifact','Keep application code consistent'],['Supply configuration','Database URL + log level','Choose environment settings'],['Run in the target','Staging or production','Use the correct resources'],'Store secrets in an appropriate secret-management system rather than source control.'],
 'lifecycle-in-cicd':['Automate the route to a release',['Continuous integration','Commit → build → test','Catch problems early'],['Delivery workflow','Package → staging checks','Prepare a releasable artifact'],['Production deployment','Approval or automation','Release and monitor'],'Continuous delivery can keep a manual production approval; continuous deployment automates that step.'],
 'why-linux-runs-servers':['Why Linux fits server workloads',['Remote access','SSH + command line','Operate without a desktop'],['Automation','Scripts + tools','Repeat work consistently'],['Server ecosystem','Packages + containers','Many deployment tools target Linux'],'Linux is common in DevOps; Windows servers are also useful for appropriate workloads.'],
 'linux-distributions':['Same kernel family, different distributions',['Linux kernel','Core OS component','Manages hardware resources'],['Distribution','Ubuntu · Debian · Fedora','Kernel plus tools and packages'],['Your server','Choose an ecosystem','Support and package availability'],'Distributions differ in package managers, release schedules, defaults, and support.'],
 'shell-vs-gui':['Two ways to ask a computer to work',['GUI','Click a folder','Visual interaction'],['Shell','Type a command','For example: ls'],['Automation','Save commands in a script','Repeat a workflow'],'A terminal is the interface window; the shell interprets commands inside it.'],
 'wsl2-on-windows':['Linux alongside your Windows tools',['Windows','Your usual desktop','Editor and browser'],['WSL 2','Lightweight managed VM','Runs a real Linux kernel'],['Linux distribution','Ubuntu, for example','Shell and Linux tools'],'WSL 2 is a useful local learning environment; it is not the same as your production server.'],
 'pwd':['Ask: where am I now?',['Current folder','/home/aasritha','Your shell’s location'],['Command','pwd','Print working directory'],['Output','/home/aasritha','Shows the current path'],'Run pwd before a command when you are unsure which directory you are working in.'],
 'ls':['Ask: what is in this folder?',['Current directory','Your project folder','Contains files and folders'],['Command','ls','Lists visible entries'],['Output','app.py  logs  README.md','Names in this directory'],'Use ls -a to include dotfiles; ls -lh adds details and readable file sizes.'],
 'cd':['Move through the folder tree',['Start here','/home/aasritha','Current working directory'],['Command','cd projects','Enter the projects folder'],['Now here','/home/aasritha/projects','pwd confirms the move'],'cd .. moves to the parent directory. cd changes location, not file contents.'],
 'tree':['See several folder levels at once',['Directory','project/','Starting point'],['Tree view','├─ app/   └─ logs/','Shows parent-child relationships'],['Bound the output','tree -L 2','Show only two levels'],'tree may need installing. Use limited depth on a large project.'],
 'absolute-vs-relative-paths':['Two ways to name the same destination',['Absolute path','/home/aasritha/logs','Starts from the root /'],['Current directory','/home/aasritha','Your starting location'],['Relative path','logs','Resolved from where you are'],'Relative paths depend on your current directory; absolute paths start at /.'],
 'common-linux-directories':['A few useful Linux landmarks',['/etc','System configuration','Many service settings live here'],['/var/log','System and service logs','Useful when troubleshooting'],['/home','User directories','Personal files and projects'],'These are common conventions; applications and distributions may use other locations.'],
 'hidden-files':['A leading dot changes normal listings',['Directory contents','.env  .git/  app.py','Dot-prefixed names are hidden'],['ls','app.py','Default listing hides dotfiles'],['ls -a','.  ..  .env  .git  app.py','Includes hidden entries'],'Hidden does not mean secure. Keep credentials out of Git, even in a dotfile.']
};
function visualFor(t){const slug=t.id.replace(/^\d+-/,'').replace(/\.md$/,'');return topicVisuals[slug];}
function visualIcon(text){if(/file|folder|director|path|source|project|artifact|package/i.test(text))return '<path d="M6 15h23l8 8h31v39H6z"/><path d="M6 24h62M17 38h30M17 47h23"/>';if(/database|disk|storage|heap|ram|memory/i.test(text))return '<ellipse cx="37" cy="16" rx="26" ry="9"/><path d="M11 16v40c0 12 52 12 52 0V16M11 36c0 12 52 12 52 0"/>';if(/cpu|kernel|compiler|runtime|clr|process/i.test(text))return '<rect x="18" y="15" width="38" height="40" rx="5"/><rect x="28" y="25" width="18" height="20" rx="2"/><path d="M8 25h10M8 45h10M56 25h10M56 45h10M28 5v10M46 5v10M28 55v10M46 55v10"/>';if(/cloud|network|service|server|payment/i.test(text))return '<path d="M17 53h41a13 13 0 0 0 0-26 21 21 0 0 0-40-5 16 16 0 0 0-1 31z"/><path d="M28 62h20M38 53v9"/>';return '<rect x="5" y="10" width="65" height="48" rx="6"/><path d="M5 22h65M18 32l9 7-9 7M36 46h15"/><circle cx="14" cy="16" r="1"/>';}

function diagramMarkup(t){const v=visualFor(t);if(!v)return '';const comparison=/vs-|dependencies|semantic-versioning|common-linux|why-linux|linux-distributions/.test(t.id);return '<figure class="topic-visual" aria-label="'+esc(v[0])+'"><div class="visual-heading"><span class="eyebrow">THE IDEA, VISUALIZED</span><span>'+(comparison?'COMPARE THE PARTS':'FOLLOW THE CONNECTION')+'</span></div><h2>'+esc(v[0])+'</h2><div class="visual-flow">'+v.slice(1,4).map((n,i)=>'<div class="visual-node node-'+i+'"><span class="node-number">0'+(i+1)+'</span><svg viewBox="0 0 76 76" aria-hidden="true">'+visualIcon(n.join(' '))+'</svg><small>'+esc(n[0])+'</small><strong>'+esc(n[1])+'</strong><p>'+esc(n[2])+'</p></div>'+(i<2?'<span class="flow-arrow" aria-hidden="true">'+(comparison?'·':'→')+'</span>':'')).join('')+'</div><figcaption><span>↳</span> '+esc(v[4])+'</figcaption></figure>';}

// Day 7–10 visual descriptions.
Object.assign(topicVisuals, {
  "cp": [
    "Copy leaves the original in place",
    [
      "Source file",
      "cp-app.conf",
      "port=8080"
    ],
    [
      "Command",
      "cp source backup",
      "Read source; write a copy"
    ],
    [
      "Result",
      "Two separate files",
      "Source and backup both exist"
    ],
    "Editing the backup does not edit the original."
  ],
  "mv": [
    "Move changes where the file is found",
    [
      "Before",
      "mv-old.txt",
      "One file in the current folder"
    ],
    [
      "Rename",
      "mv old new",
      "The filename changes"
    ],
    [
      "Move",
      "mv new archive/",
      "The file now lives in archive"
    ],
    "A move does not leave an extra copy at the old path."
  ],
  "rm": [
    "A pathname disappears after removal",
    [
      "Inspect",
      "ls -l rm-demo.txt",
      "Confirm the exact target"
    ],
    [
      "Remove",
      "rm -i rm-demo.txt",
      "Agree only to this sample"
    ],
    [
      "Verify",
      "Path no longer found",
      "No recycle-bin promise"
    ],
    "An open deleted file can still occupy disk space until its last open reference is closed."
  ],
  "mkdir": [
    "Build the directory before placing files",
    [
      "Parent",
      "day07/",
      "Your practice location"
    ],
    [
      "Create",
      "mkdir -p demo/releases",
      "Make missing folders"
    ],
    [
      "Result",
      "demo/releases/",
      "A place to put release files"
    ],
    "Creating a directory does not automatically give another user permission to use it."
  ],
  "touch": [
    "Touch affects existence or timestamps",
    [
      "Missing file",
      "touch demo.txt",
      "Creates an empty file"
    ],
    [
      "Existing file",
      "touch demo.txt",
      "Updates timestamps"
    ],
    [
      "Contents",
      "Not replaced",
      "A nonempty file stays nonempty"
    ],
    "touch does not write your notes or clear an existing file."
  ],
  "cat": [
    "Read a small file without changing it",
    [
      "Input",
      "cat-demo.txt",
      "Contains two sample lines"
    ],
    [
      "Read",
      "cat cat-demo.txt",
      "Print the existing text"
    ],
    [
      "Terminal",
      "The same two lines",
      "The file stays unchanged"
    ],
    "For a very large file, use less, head, or tail instead."
  ],
  "less": [
    "Browse rather than flood the screen",
    [
      "Open",
      "less application.log",
      "A pager takes over the terminal"
    ],
    [
      "Navigate",
      "/ERROR · n · Space",
      "Search and move through text"
    ],
    [
      "Leave",
      "q",
      "Return to the shell prompt"
    ],
    "less is a viewer, not an editor. Searching does not modify the file."
  ],
  "head": [
    "Look at the start of a file",
    [
      "File",
      "Header + many rows",
      "The full data remains on disk"
    ],
    [
      "Select",
      "head -n 2",
      "Choose the first two lines"
    ],
    [
      "Display",
      "Header + first row",
      "Only that portion is printed"
    ],
    "head does not shorten or rewrite the original file."
  ],
  "tail": [
    "Read the newest messages",
    [
      "Existing log",
      "Many earlier events",
      "The service has been running"
    ],
    [
      "Inspect",
      "tail -n 2",
      "Show the last two lines"
    ],
    [
      "Follow",
      "tail -f",
      "Watch newly appended lines"
    ],
    "Ctrl+C stops the viewer. The application writing the log is a different process."
  ],
  "nano-vim-basics": [
    "Editing is different from viewing",
    [
      "Before",
      "port=8080",
      "Back up the sample file"
    ],
    [
      "Edit",
      "nano or vim",
      "Change the text deliberately"
    ],
    [
      "After",
      "port=9090",
      "Save, inspect, then validate"
    ],
    "Saving configuration does not automatically reload the application."
  ],
  "find": [
    "Start somewhere, then match names",
    [
      "Starting place",
      "find-demo/",
      "Walk this directory tree"
    ],
    [
      "Conditions",
      "-type f -name \"*.log\"",
      "Only regular .log files"
    ],
    [
      "Matches",
      "logs/app.log",
      "Print the matching paths"
    ],
    "Quote wildcard patterns so find receives the pattern you intended."
  ],
  "locate": [
    "Fast lookup, possibly older information",
    [
      "Filesystem",
      "Files that exist now",
      "New files may just have arrived"
    ],
    [
      "Index",
      "Last database refresh",
      "A stored list of filenames"
    ],
    [
      "Lookup",
      "locate name",
      "Search that stored list"
    ],
    "A missing locate result does not prove the file is absent."
  ],
  "rwx": [
    "Read the permission string in three groups",
    [
      "Owner",
      "rw-",
      "Read and modify this file"
    ],
    [
      "Group",
      "r--",
      "Read this file"
    ],
    [
      "Others",
      "---",
      "No file permissions here"
    ],
    "A readable file still needs an accessible path through its parent directories."
  ],
  "chmod": [
    "Two ways to change the same permissions",
    [
      "Numbers",
      "640 = 6 | 4 | 0",
      "Owner rw; group r; others none"
    ],
    [
      "Symbols",
      "g+w",
      "Add write for the owning group"
    ],
    [
      "After the change",
      "660 = rw-rw----",
      "Ownership stays the same"
    ],
    "chmod describes access. It does not move the file or choose its owner."
  ],
  "chown": [
    "Ownership changes; the file stays put",
    [
      "Before",
      "Owner: ash",
      "File is on Ash’s computer"
    ],
    [
      "Change",
      "chown aasritha file.txt",
      "Existing account on that system"
    ],
    [
      "After",
      "Owner: aasritha",
      "Same file, same computer"
    ],
    "Ownership is not a file transfer and does not bypass parent-directory permissions."
  ],
  "chgrp": [
    "Choosing a group is not granting access",
    [
      "Choose a team",
      "chgrp marketing file",
      "Change the owning group"
    ],
    [
      "Set its access",
      "chmod g+r file",
      "Allow group reading"
    ],
    [
      "Reach the path",
      "Directory traversal",
      "The team must reach the file"
    ],
    "A single file has one owning group; ACLs can grant additional named groups access."
  ],
  "umask": [
    "A mask removes bits at creation",
    [
      "Requested defaults",
      "Files 666 · folders 777",
      "Usual starting modes"
    ],
    [
      "Mask 022",
      "Block group/others write",
      "0 means block nothing"
    ],
    [
      "New entries",
      "Files 644 · folders 755",
      "When no default ACL changes it"
    ],
    "umask is a block list. It does not grant the digits written in the mask."
  ],
  "sudo": [
    "One allowed command, another identity",
    [
      "Your shell",
      "Normal user",
      "Your original session"
    ],
    [
      "Policy check",
      "sudo command",
      "Is this action allowed?"
    ],
    [
      "Command runs",
      "Target identity",
      "Root unless another target is set"
    ],
    "After the command finishes, the original shell still has its original identity."
  ],
  "root-vs-user": [
    "Identity determines which rules apply",
    [
      "Ordinary user",
      "Nonzero UID",
      "Uses assigned permissions"
    ],
    [
      "Administrator",
      "UID 0: root",
      "Broad system authority"
    ],
    [
      "Service account",
      "Application identity",
      "Grant only what it needs"
    ],
    "Run everyday application work with the least access that lets it do its job."
  ],
  "setuid-basics": [
    "The program’s effective identity can differ",
    [
      "Caller",
      "Ordinary user",
      "Starts an allowed executable"
    ],
    [
      "Executable",
      "Setuid bit + file owner",
      "Controls effective identity"
    ],
    [
      "Controlled work",
      "For example passwd",
      "Program validates the operation"
    ],
    "The caller’s shell does not permanently become the executable’s owner."
  ],
  "etc-passwd": [
    "An account entry describes an identity",
    [
      "Name + UID",
      "aasritha : 1000",
      "Readable name and numeric user"
    ],
    [
      "Primary group",
      "GID 1000",
      "One primary group ID"
    ],
    [
      "Home + shell",
      "/home/... : /bin/bash",
      "Configured location and shell"
    ],
    "getent can resolve accounts from configured sources beyond the local passwd file."
  ],
  "etc-shadow": [
    "Public identity and protected authentication",
    [
      "Account directory",
      "/etc/passwd",
      "Names, IDs, home, shell"
    ],
    [
      "Protected records",
      "/etc/shadow",
      "Hashes and password-age data"
    ],
    [
      "Inspect status",
      "passwd -S your-user",
      "No need to expose the hashes"
    ],
    "A password lock does not automatically disable every other login method."
  ],
  "useradd": [
    "Account creation has several choices",
    [
      "Identity",
      "useradd devopsdemo",
      "Create the local account record"
    ],
    [
      "Options",
      "-m · -U · -s",
      "Home, personal group, shell"
    ],
    [
      "Verify",
      "getent · id · ls -ld",
      "Inspect what was actually made"
    ],
    "Do not run account-creation examples on a shared server just to practise."
  ],
  "groups": [
    "Team membership and file access meet",
    [
      "Account",
      "ananya",
      "Can belong to several groups"
    ],
    [
      "Shared group",
      "release-demo",
      "One team identity"
    ],
    [
      "File rule",
      "Group read/write bits",
      "Controls the team’s access"
    ],
    "A membership update does not rewrite the group list of a shell that is already running."
  ],
  "su-vs-sudo": [
    "Identity can change for a command or session",
    [
      "su - user",
      "Login-style shell",
      "Usually target-user authentication"
    ],
    [
      "sudo -u user command",
      "One authorised command",
      "Uses configured sudo policy"
    ],
    [
      "Afterwards",
      "Check whoami",
      "Exit any switched shell"
    ],
    "A test run with extra privilege may hide the permission problem seen by the application."
  ],
  "sudoers": [
    "A policy is checked before elevation",
    [
      "Request",
      "User + command + target",
      "What is being asked?"
    ],
    [
      "Policy",
      "sudoers rules",
      "Is this exact action allowed?"
    ],
    [
      "Decision",
      "Allow or deny",
      "Optional authentication rules"
    ],
    "Use visudo for local policy edits; a typo can affect administrative access."
  ],
  "ps": [
    "A snapshot tells you who is running",
    [
      "Start",
      "sleep 60 &",
      "A harmless practice process"
    ],
    [
      "Identify",
      "Capture $!",
      "Save its PID immediately"
    ],
    [
      "Inspect",
      "ps -p PID",
      "Read user, parent, and state"
    ],
    "An existing PID is not proof that a customer-facing service works."
  ],
  "top-and-htop": [
    "Use a live view to investigate a symptom",
    [
      "Observe",
      "top or htop",
      "CPU and memory change over time"
    ],
    [
      "Compare",
      "What else is waiting?",
      "Database, network, disk, locks"
    ],
    [
      "Investigate",
      "Evidence before scaling",
      "High latency has several causes"
    ],
    "Low CPU does not mean the application is healthy or fast."
  ],
  "kill": [
    "Signal delivery and shutdown are different",
    [
      "Identify",
      "Your practice PID",
      "Verify the command first"
    ],
    [
      "Send",
      "kill -TERM PID",
      "Request termination"
    ],
    [
      "Check",
      "Did the process exit?",
      "A handler may need time"
    ],
    "For managed applications, use the service manager or orchestrator’s lifecycle controls."
  ],
  "sigterm-vs-sigkill": [
    "A shutdown request is not a force-stop",
    [
      "SIGTERM",
      "Can be handled",
      "Application may drain and clean up"
    ],
    [
      "Grace period",
      "Verify and allow time",
      "Wait within an appropriate limit"
    ],
    [
      "SIGKILL",
      "Cannot be handled",
      "No application cleanup routine"
    ],
    "Use graceful lifecycle controls first; forced termination can interrupt work."
  ],
  "background-jobs": [
    "Background work shares your shell session",
    [
      "Start",
      "sleep 30 &",
      "Launch a temporary job"
    ],
    [
      "Prompt returns",
      "Keep using the shell",
      "The timer still exists"
    ],
    [
      "Track it",
      "jobs or captured $!",
      "Job number and PID differ"
    ],
    "Backgrounding alone is not a guarantee that work survives logout."
  ],
  "jobs": [
    "Each shell has its own job list",
    [
      "Terminal A",
      "Starts a timer",
      "Owns job number 1"
    ],
    [
      "jobs in A",
      "Timer is listed",
      "This shell tracks that job"
    ],
    [
      "jobs in B",
      "May be empty",
      "A different shell notebook"
    ],
    "A Done notification means a tracked job finished, not that another command failed."
  ],
  "nohup": [
    "Hangup protection is only one feature",
    [
      "nohup",
      "Ignore SIGHUP",
      "One signal behaviour changes"
    ],
    [
      "Output + input",
      "Redirect explicitly",
      "Do not depend on a terminal"
    ],
    [
      "What is missing",
      "No restart or boot setup",
      "Not a service supervisor"
    ],
    "nohup does not guarantee survival of reboot, other signals, or session cleanup policies."
  ],
  "foreground-and-bg": [
    "Paused and background are different states",
    [
      "Foreground",
      "sleep 300",
      "The terminal is occupied"
    ],
    [
      "Ctrl+Z",
      "Stopped",
      "The job is paused"
    ],
    [
      "bg / fg",
      "Resume the job",
      "Background or foreground"
    ],
    "Ctrl+C interrupts; Ctrl+Z normally pauses. They are different actions."
  ],
  "zombie-and-orphan-processes": [
    "Two different process-family situations",
    [
      "Zombie",
      "Child already exited",
      "Parent has not collected status"
    ],
    [
      "Orphan",
      "Original parent exited",
      "Child may still be running"
    ],
    [
      "Correct response",
      "Inspect the parent",
      "Do not blindly force-kill"
    ],
    "A zombie cannot run cleanup code or be killed into exiting again; it needs to be reaped."
  ]
});
