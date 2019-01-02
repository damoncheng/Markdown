#define ZERO_WIDTH  0   //clear width
#define MID_WIDTH   15  //mid width
#define LONG_WIDTH  30  //long width

#define SYMBOL_BIND (1 << 4 | 1 << 5 | 1 << 6 | 1 << 7)
#define SYMBOL_TYPE (1 << 3 | 1 << 2 | 1 << 1 | 1)

#define SHT_NULL 0       //Marks an unused section header
#define SHT_PROGBITS 1   //Contains information defined by the program
#define SHT_SYMTAB   2	 //Contains a linker symbol table
#define SHT_STRTAB   3   //Contains a string table
#define SHT_RELA     4   //Contains "Rela" type relocation entries
#define SHT_HASH     5   //Contains a symbol hash table
#define SHT_DYNAMIC  6   //Contains dynamic linking tables
#define SHT_NOTE     7   //Contains note information
#define SHT_NOBITS   8   //Contains uninitialized space; does not occupy any space in the file
#define SHT_REL      9   //Contains "Rel" type relocation entries
#define SHT_SHLIB    10  //Reserved
#define SHT_DYNSYM   11  //Contains a dynamic loader symbol table
#define SHT_LOOS     0x60000000 //Environment-specific use
#define SHT_HIOS     0x6FFFFFFF
#define SHT_LOPROC   0x70000000 //Processor-specific use
#define SHT_HIPROC   0x7FFFFFFF


#define ELF64_R_SYM(i)((i) >> 32)
#define ELF64_R_TYPE(i)((i) & 0xffffffffL)
#define ELF64_R_INFO(s,t) (((s) << 32 ) + ((t) & 0xffffffffL))

#include <iostream>
#include <iomanip>
#include <string>
#include <fstream>
#include <vector>


using namespace std;


void clear_cout_width()
{
	cout.width(ZERO_WIDTH);
}

void set_cout_width()
{
	cout.width(MID_WIDTH);
}

void long_cout_width()
{
	cout.width(LONG_WIDTH);
}

void hex_cout(const char * hint, int value)
{
    cout << hint << ":" << "0x" << hex << value << dec << "-" << value << endl;
}

void string_cout(const char * hint, const char * value)
{
	cout << hint << ":" << value << endl;
}

char * section_name_offset(char * section_name , int offset)
{

	return (char *)(section_name + offset);

}

template<typename T>
void debug(T x)
{
	cout << endl << x << endl;
}

class  ELF{

private:

	typedef unsigned long  Elf64_Addr;     //8 bytes
	typedef unsigned long  Elf64_Off;      //8 bytes
	typedef unsigned short Elf64_Half;     //2 bytes
	typedef unsigned int   Elf64_Word;     //4 bytes
	typedef int   Elf64_Sword;    //4 bytes
	typedef unsigned long  Elf64_Xword;    //8 bytes
	typedef long  Elf64_Sxword;   //8 bytes

	typedef struct {

		unsigned char e_ident[16];    //ELF identification
		Elf64_Half    e_type;         //Object file type
		Elf64_Half    e_machine;;     //Machine type
		Elf64_Word    e_version;      //Object file version
		Elf64_Addr    e_entry;        //Entry point address
		Elf64_Off     e_phoff;        //Program header offset
		Elf64_Off     e_shoff;        //Section header offset
		Elf64_Word    e_flags;        //Processor-specific flags
		Elf64_Half    e_ehsize;       //ELF header size
		Elf64_Half    e_phentsize;    //Size of programe header entry
		Elf64_Half    e_phnum;        //Number of program header entries
		Elf64_Half    e_shentsize;    //Size of section header entry
		Elf64_Half    e_shnum;        //Number of section header entries
		Elf64_Half    e_shstrndx;     //Section name string table index

	} Elf64_Ehdr;

	typedef struct {

		Elf64_Word  sh_name;        /* Section name */
		Elf64_Word  sh_type;        /* Section type */
		Elf64_Xword sh_flags;      /* Section attributes */
		Elf64_Addr  sh_addr;        /*Virtual address in memory*/
		Elf64_Off   sh_offset;      /*Offset in file*/
		Elf64_Xword sh_size;       /*Size of section*/
		Elf64_Word  sh_link;       /*Link to other section*/
		Elf64_Word  sh_info;       /*Miscellaneous information*/
		Elf64_Xword sh_addralign;  /*Address alignment boundary*/
		Elf64_Xword sh_entsize;    /*Size of entries, if section has table*/

	} Elf64_Shdr;

	typedef struct
	{

		Elf64_Word st_name;     /* Symbol name */
		unsigned char st_info;  /* Type and Binding attributes */
		unsigned char st_other; /* Reserved */
		Elf64_Half st_shndx;	/* Section table index */
		Elf64_Addr st_value;    /* Symbol value */
		Elf64_Xword st_size;    /* Size of object(eg.common) */

	} Elf64_Sym;

	typedef struct
	{
	
		Elf64_Addr   r_offset; /* Address of reference */
		Elf64_Xword  r_info;   /* Symbol index and type of relocation */
	
	} Elf64_Rel;

	typedef struct 
	{

		Elf64_Addr   r_offset; /* Address of reference */
		Elf64_Xword  r_info;   /* Symbol index and type of relocation */
		Elf64_Sxword r_addend; /* Constant part of expression */

	} Elf64_Rela;

	ifstream wf;
    Elf64_Ehdr * elf_header = NULL;
	Elf64_Shdr * section_header = NULL;
	char * section_name = NULL;
	char * tmp_symbol_name = NULL;

	Elf64_Sym   symbol_entry;
	Elf64_Rel   rel_entry;
	Elf64_Rela  rela_entry;

public:

	ELF(string filename);

	void echo_elf_header();
	void echo_elf_section();

	void fill_symbol_section_entry(Elf64_Off sh_offset, Elf64_Xword sh_entsize, unsigned int num);
	void fill_rela_section_entry(Elf64_Off sh_offset, Elf64_Xword sh_entsize, unsigned int num);
	void fill_string_section(char * section_name, Elf64_Off sh_offset, Elf64_Xword sh_size);

	char * get_symbol_entry_name(unsigned int symbol_section_index, unsigned int symbol_entry_index);

	~ELF();

};

ELF::ELF(string filename)
{

    const unsigned int ELF_HEADER_SIZE = sizeof(Elf64_Ehdr);
	wf.open(filename, ios_base::out | ios_base::binary);

	if(!wf.is_open())
	{
		cout << "Error open file!" << endl;
		exit(1);
	}

	cout << endl << endl;
	//read elf header
	elf_header = new Elf64_Ehdr;
    wf.read((char *)elf_header, ELF_HEADER_SIZE);

	wf.seekg(elf_header->e_shoff, ios_base::beg);

    //get section header table
	section_header = new Elf64_Shdr[elf_header->e_shnum];
	wf.read((char *)section_header, elf_header->e_shentsize * elf_header->e_shnum);

	section_name = new char[section_header[elf_header->e_shstrndx].sh_size];
	//get section that contain section name
	wf.seekg(section_header[elf_header->e_shstrndx].sh_offset, ios_base::beg);
	wf.read((char *)section_name, section_header[elf_header->e_shstrndx].sh_size);

}

ELF::~ELF()
{

    delete elf_header;
	delete section_header;
	delete section_name;
    wf.close();

}


void ELF::echo_elf_header()
{

	cout << "ELF Header:" << endl;
    cout << "Magic: " << hex << (int)elf_header->e_ident[0] << dec 
		                     << elf_header->e_ident[1] 
                             << elf_header->e_ident[2]  
							 << elf_header->e_ident[3] 
							 << endl;

	hex_cout("ELF header size", elf_header->e_ehsize);

    if((unsigned int)elf_header->e_ident[4] == 1)
	   string_cout("File Class", "32-bit object");
    else if((unsigned int)elf_header->e_ident[4] == 2)
	   string_cout("File Class", "64-bit object");
    else
	   string_cout("File Class", "unknown objects");


    if((unsigned int)elf_header->e_ident[5] == 1)
	   string_cout("Data Encoding", "little endian");
    else if((unsigned int)elf_header->e_ident[5] == 2)
	   string_cout("Data Encoding", "bit endian");
    else
	   string_cout("Data Encoding", "unknown endian");


    if((unsigned int)elf_header->e_ident[7] == 0)
	   string_cout("OS/ABI identification: ", "System V ABI");
    else if((unsigned int)elf_header->e_ident[7] == 1)
	   string_cout("OS/ABI identification: ", "HP-UX operating system");
    else if((unsigned int)elf_header->e_ident[7] == 255)
	   string_cout("OS/ABI identification: ", "Standalone (embedded)");
    else
	   string_cout("OS/ABI identification: ", "unknow ABI");

    //0 for system v, third edition
    hex_cout("ABI Version:  ", (unsigned int)elf_header->e_ident[8]);

    cout << "Object File Types: ";
    switch((unsigned int)elf_header->e_type)
    {
    
        case 0: 
            cout << "No file type" << endl;
            break;
        case 1:
            cout << "Relocatable object file" << endl;
            break;
        case 2:
            cout << "Executable file" << endl;
            break;
        case 3:
            cout << "Shared object file" << endl;
            break;
        case 4:
            cout << "Core file" << endl;
            break;
        default:
            cout << "unknow Object File Type" << endl;
    }

    hex_cout("Start of padding bytes: ",(unsigned int)elf_header->e_ident[9]);
	hex_cout("File Version(1=current):", (unsigned int)elf_header->e_ident[6]);

	if(elf_header->e_machine == 0)
		string_cout("Machine Type", "no computer");
	else if(elf_header->e_machine == 2)
		string_cout("Machine Type", "SPARC");
	else if(elf_header->e_machine == 3)
		string_cout("Machine Type", "Intel 80386");
	else if(elf_header->e_machine == 18)
		string_cout("Machine Type", "Sun SPARC 32+");
	else if(elf_header->e_machine == 43)
		string_cout("Machine Type", "SPARC V9");
	else if(elf_header->e_machine == 62)
		string_cout("Machine Type", "AMD 64");
	else
		cout << "Machine Type" << ":" << elf_header->e_machine << "(Unkonw machine)" << endl;

    hex_cout("Object File Version(1=current): ", elf_header->e_version);
    string_cout("Note:", 
			    "contains the virtual address of the program entry point." 
				"If there is no entry point, this field contains zero");
    hex_cout("Entry Point Address: ", elf_header->e_entry);
	
    //contain processor-specific flags
    hex_cout("Processor-specific flags: ", elf_header->e_flags);
    
    //if no programe header, it is set to 0
    cout << endl;
    hex_cout("Programe header Offset: ", elf_header->e_phoff);
    hex_cout("Size of program header table entry: ", elf_header->e_phentsize);
    hex_cout("Number of entries in the program header table: ", elf_header->e_phnum);
    cout << endl;

    cout << endl;
    hex_cout("Section header Offset: ", elf_header->e_shoff);
    hex_cout("Size of section header table entry: ", elf_header->e_shentsize);
    hex_cout("Number of entries in the section header table : ", elf_header->e_shnum);
    hex_cout("Section name string table index: ", elf_header->e_shstrndx);
    cout << endl;
	cout << endl;

}


void ELF::fill_symbol_section_entry(Elf64_Off sh_offset, Elf64_Xword sh_entsize, unsigned int num)
{
	wf.seekg(sh_offset + sh_entsize * num, ios_base::beg);
	wf.read((char *)&symbol_entry, sh_entsize);
}

void ELF::fill_rela_section_entry(Elf64_Off sh_offset, Elf64_Xword sh_entsize, unsigned int num)
{
	wf.seekg(sh_offset + sh_entsize * num, ios_base::beg);
	wf.read((char *)&rela_entry, sh_entsize);
}


void ELF::fill_string_section(char * section_name, Elf64_Off sh_offset, Elf64_Xword sh_size)
{
	wf.seekg(sh_offset, ios_base::beg);
	wf.read(section_name, sh_size);
}

void ELF::echo_elf_section()
{

	cout.setf(ios_base::left, ios_base::adjustfield);

	cout << setw(10) << "num:" << "section index" << endl;
	cout << setw(10) << "name:" << "section name" << endl;
	cout << setw(10) << "type:" << "section type" << endl;
	cout << setw(10) << "flags:" << "section attributes" << endl;
	cout << setw(10) << "(0x)address:" << "virtual address in memory" << endl;
	cout << setw(10) << "(0x)offset:" << "offset in file" << endl;
	cout << setw(10) << "size:" << "size of section" << endl;
	cout << setw(10) << "link:" << "link to other section" << endl;
	cout << setw(10) << "info:" << "miscellaneous information" << endl;
	cout << setw(10) << "addralign:" << "address alignment boundary" << endl;
	cout << setw(10) << "entsize:" << "size of entries, if section has table" << endl;


    cout << "Section Header:" << endl;
	
	cout <<  setw(MID_WIDTH) << "num"  
		 <<  setw(MID_WIDTH) << "name"  
		 <<  setw(MID_WIDTH) << "type" 
		 <<  setw(LONG_WIDTH) << "flags" 
		 <<  setw(MID_WIDTH) << "address" 
		 <<  setw(MID_WIDTH) << "offset" 
		 <<  setw(MID_WIDTH) << "size" 
		 <<  setw(MID_WIDTH) << "link" 
		 <<  setw(MID_WIDTH) << "info" 
		 <<  setw(MID_WIDTH) << "addralign" 
		 <<  setw(MID_WIDTH) << "entsize";

	for(int i = 0; i < elf_header->e_shnum; i++)
	{
		cout << endl;

		cout << setw(MID_WIDTH) << i;

        //offset
		cout << setw(MID_WIDTH) <<  section_name_offset(section_name, section_header[i].sh_name);

		set_cout_width();
		switch(section_header[i].sh_type)
		{
			case SHT_NULL:
				cout << "SHT_NULL";
				break;
			case SHT_PROGBITS:
				cout << "SHT_PROGBITS";
				break;
			case SHT_SYMTAB:
				cout << "SHT_SYMTAB";
				break;
			case SHT_STRTAB:
				cout << "SHT_STRTAB";
				break;
			case SHT_RELA:
				cout << "SHT_RELA";
				break;
			case SHT_HASH:
				cout << "SHT_HASH";
				break;
			case SHT_DYNAMIC:
				cout << "SHT_DYNAMIC";
				break;
			case SHT_NOTE:
				cout << "SHT_NOTE";
				break;
			case SHT_NOBITS:
				cout << "SHT_NOBITS";
				break;
			case SHT_REL:
				cout << "SHT_REL";
				break;
			case SHT_SHLIB:
				cout << "SHT_SHLIB";
				break;
			case SHT_DYNSYM:
				cout << "SHT_DYNSYM";
				break;
			case SHT_LOOS:
				cout << "SHT_LOOS";
				break;
			case SHT_HIOS:
				cout << "SHT_HIOS";
				break;
			case SHT_LOPROC:
				cout << "SHT_LOPROC";
				break;
			case SHT_HIPROC:
				cout << "SHT_HIPROC";
				break;
			default:
				cout << "Unknown Type";
		}

		long_cout_width();
		switch(section_header[i].sh_flags)
		{
			case 0x1:
				cout << "SHF_WRITE";
				break;
			case 0x2:
				cout << "SHF_ALLOC";
				break;
			case 0x4:
				cout << "SHF_EXECINSTR";
				break;
			case 0x1 | 0x2:
				cout << "SHF_WRITE|SHF_ALLOC";
				break;
			case 0x1 | 0x4:
				cout << "SHF_WRITE|SHF_EXECINSTR";
				break;
			case 0x2 | 0x4:
				cout << "SHF_ALLOC|SHF_EXECINSTR";
				break;
			case 0x1 | 0x2 | 0x4:
				cout << "SHF_WRITE|SHF_ALLOC|SHF_EXECINSTR";
				break;
			case 0x0F000000:
				cout << "SHF_MASKOS";
				break;
			case 0xF0000000:
				cout << "SHF_MASKPROC";
				break;
			default:
				cout << "";
				break;
		}

		cout << setw(MID_WIDTH) << hex << section_header[i].sh_addr;

		cout << setw(MID_WIDTH) << hex << section_header[i].sh_offset;

		cout << setw(MID_WIDTH) << dec << section_header[i].sh_size;

		cout << setw(MID_WIDTH) << dec << section_header[i].sh_link;

		cout << setw(MID_WIDTH) << dec << section_header[i].sh_info;

		cout << setw(MID_WIDTH) << dec << section_header[i].sh_addralign;

		cout << setw(MID_WIDTH) << dec << section_header[i].sh_entsize;

	}



	for(unsigned int i = 0; i < elf_header->e_shnum; i++)
	{
		if(section_header[i].sh_type == SHT_SYMTAB)
		{
			cout << endl << endl;
			unsigned int entnum = section_header[i].sh_size / section_header[i].sh_entsize;
			cout << "Symbol table [" << i << "] " << section_name_offset(section_name, section_header[i].sh_name) << " containers " << entnum << " entries:" << endl;
			cout <<  section_header[i].sh_info << " local symbols string table and string table: [" << section_header[i].sh_link << "] " 
				 <<  section_name_offset(section_name, section_header[section_header[i].sh_link].sh_offset) << endl;;

			//获取 symbol section的string table section
			char * symbol_section_name = new char[section_header[section_header[i].sh_link].sh_size];
			fill_string_section(symbol_section_name, section_header[section_header[i].sh_link].sh_offset, 
					                  section_header[section_header[i].sh_link].sh_size);

			cout <<  setw(MID_WIDTH) << "num"  
				 <<  setw(MID_WIDTH) << "value"  
				 <<  setw(MID_WIDTH) << "size" 
				 <<  setw(MID_WIDTH)<< "type" 
				 <<  setw(MID_WIDTH) << "bind" 
				 <<  setw(MID_WIDTH) << "other" 
				 <<  setw(MID_WIDTH) << "ndx" 
				 <<  setw(MID_WIDTH) << "name";

			cout << endl;

			for(unsigned int j = 0; j < entnum; j++)
			{
				fill_symbol_section_entry(section_header[i].sh_offset, section_header[i].sh_entsize, j);

				cout << setw(MID_WIDTH) << j;
				cout << setw(MID_WIDTH) << hex << symbol_entry.st_value << dec;
				cout << setw(MID_WIDTH) << symbol_entry.st_size;
				switch(symbol_entry.st_info & SYMBOL_TYPE)
				{
					case 0:
						cout << setw(MID_WIDTH) << "STT_NOTYPE";
						break;
					case 1:
						cout << setw(MID_WIDTH) << "STT_OBJECT";
						break;
					case 2:
						cout << setw(MID_WIDTH) << "STT_FUNC";
						break;
					case 3:
						cout << setw(MID_WIDTH) << "STT_SECTION";
						break;
					case 4:
						cout << setw(MID_WIDTH) << "STT_FILE";
						break;
					case 10:
						cout << setw(MID_WIDTH) << "STT_LOOS";
						break;
					case 12:
						cout << setw(MID_WIDTH) << "STT_HIOS";
						break;
					case 13:
						cout << setw(MID_WIDTH) << "STT_LOPROC";
						break;
					case 15:
						cout << setw(MID_WIDTH) << "STT_HIPROC";
						break;
					default:
						cout << setw(MID_WIDTH) << "STT_UNKNOWN";
				}

				switch((symbol_entry.st_info & SYMBOL_BIND) >> 4)
				{
					case 0:
						cout << setw(MID_WIDTH) << "STB_LOCAL";
						break;
					case 1:
						cout << setw(MID_WIDTH) << "STB_GLOBAL";
						break;
					case 2:
						cout << setw(MID_WIDTH) << "STB_WEAK";
						break;
					case 10:
						cout << setw(MID_WIDTH) << "STB_LOOS";
						break;
					case 12:
						cout << setw(MID_WIDTH) << "STB_HIOS";
						break;
					case 13:
						cout << setw(MID_WIDTH) << "STB_LOPROC";
						break;
					case 15:
						cout << setw(MID_WIDTH) << "STB_HIPROC";
						break;
					default:
						cout << setw(MID_WIDTH) << "STB_UNKNOWN";
				}

				cout << setw(MID_WIDTH) << symbol_entry.st_other;

				switch(symbol_entry.st_shndx)
				{
					case 0x0:
						cout << setw(MID_WIDTH) << "SHN_UNDEF";
						break;
					case 0xFF00:
						cout << setw(MID_WIDTH) << "SHN_LOPROC";
						break;
					case 0xFF1F:
						cout << setw(MID_WIDTH) << "SHN_HIPROC";
						break;
					case 0xFF20:
						cout << setw(MID_WIDTH) << "SHN_LOOS";
						break;
					case 0xFF3F:
						cout << setw(MID_WIDTH) << "SHN_HIOS";
						break;
					case 0xFFF1:
						cout << setw(MID_WIDTH) << "SHN_ABS";
						break;
					case 0xFFF2:
						cout << setw(MID_WIDTH) << "SHN_COMMMON";
						break;
					default:
						cout << setw(MID_WIDTH) << symbol_entry.st_shndx;

				}

				cout << setw(MID_WIDTH) << section_name_offset(symbol_section_name, symbol_entry.st_name);
				cout << endl;
			}

			delete symbol_section_name;
		}


		if(section_header[i].sh_type == SHT_RELA)
		{

			cout << endl << endl;

			unsigned int entnum = section_header[i].sh_size / section_header[i].sh_entsize;
			cout << "Relocation section [" << i << "] " << section_name_offset(section_name, section_header[i].sh_name)  
				 << " for section [" << section_header[i].sh_info << "] " << " at offset " << hex << section_header[i].sh_offset << dec << " contains "  
				 << entnum << " entries";
			cout << endl;

			cout <<  setw(MID_WIDTH) << "Offset"  
				 <<  setw(MID_WIDTH) << "Info" 
				 <<  setw(MID_WIDTH) << "Type"  
				 <<  setw(MID_WIDTH)<< "Sym.Name + Addend";
			cout << endl;

			for(unsigned int j = 0; j < entnum; j++)
			{
				 fill_rela_section_entry(section_header[i].sh_offset, section_header[i].sh_entsize, j);

				 cout << setw(MID_WIDTH) << hex << rela_entry.r_offset << dec;

				 cout << setw(MID_WIDTH) << hex << ELF64_R_INFO(ELF64_R_SYM(rela_entry.r_info), ELF64_R_TYPE(rela_entry.r_info))  << dec;

				 cout << setw(MID_WIDTH) << hex << ELF64_R_TYPE(rela_entry.r_info)  << dec;

				 cout << setw(MID_WIDTH) << get_symbol_entry_name(section_header[i].sh_link, ELF64_R_SYM(rela_entry.r_info)) << "\t" << rela_entry.r_addend;

				 cout << endl;
			}


		}

		if(section_header[i].sh_type == SHT_REL)
		{
		}


	}


	cout << endl;

}

char * ELF::get_symbol_entry_name(unsigned int symbol_section_index , unsigned int symbol_entry_index)
{


	Elf64_Shdr one_symbol_section = section_header[symbol_section_index];

	if(tmp_symbol_name)
		delete tmp_symbol_name;

	tmp_symbol_name = new char[section_header[one_symbol_section.sh_link].sh_size];
	fill_string_section(tmp_symbol_name, section_header[one_symbol_section.sh_link].sh_offset, 
					    section_header[one_symbol_section.sh_link].sh_size);

	fill_symbol_section_entry(one_symbol_section.sh_offset, one_symbol_section.sh_entsize, symbol_entry_index);

	return section_name_offset(tmp_symbol_name, symbol_entry.st_name);

}

int main(int argc, char **argv)
{

    //setlocale(LC_ALL, "en_US.UTF-8");

	if(argc != 2)
	{
		cout << "./main executable_file"  << endl;
		exit(1);
	}

	ELF elf(argv[1]);

	elf.echo_elf_header();
	elf.echo_elf_section();

    return 0;
}
